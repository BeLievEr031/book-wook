import asyncHandler from "express-async-handler";
import BookModel from "../models/BookModel.js";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import { convertIntoMB, fileUploader } from "../utils/utils.js";
import GenreModel from "../models/GenreModel.js";
import CartModel from "../models/CartModel.js";
import CartItemModel from "../models/CartItemModel.js";

const addBook = asyncHandler(async (req, res, next) => {
    const isGenre = await GenreModel.findById({ _id: req.book.genreid })
    if (!isGenre) {
        return next(createError(409, "Invalid Genre!!"))
    }

    const isExist = await BookModel.findOne({ $and: [{ title: req.book.title }, { author: req.book.author }] })
    if (isExist) {
        return next(createError(409, "Cannot create the book. A book with the same title and author already exists!!"))
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded' });
    }

    // Uploading a thumbnail if provided by user.
    if (req.files && req.files.thumbnail) {
        const file = req.files.thumbnail
        const MB = convertIntoMB(file.size)
        if (MB > 2) {
            return next(createError(413, 'Thumbnail File size is too large.'));
        }
        const thumbnailSrc = await fileUploader([file]);
        req.book.thumbnail = thumbnailSrc[0];
    }

    // Uploading book images if provided by user.
    if (req.files && req.files.length !== 0 && req.files.images) {
        const files = req.files.images.length ? req.files.images : [req.files.images];
        if (files.length && files.length > 4) {
            return next(createError(413, "Too much book images."))
        }

        if (!files.length && convertIntoMB(files.size) > 2) {
            return next(createError(413, 'Photo File size is too large.'));
        } else {
            for (let i = 0; i < files.length; i++) {
                if (convertIntoMB(files[i].size) > 2) {
                    return next(createError(413, `${files[i].name} Photo size is too large.`));
                }
            }
        }

        // TODO: Another way to upload the Large PDF 
        // uploading book pdf if provided.
        if (req.files && req.files.pdf) {
            const file = req.files.pdf
            const MB = convertIntoMB(file.size)
            if (MB > 20) {
                return next(createError(413, 'Thumbnail File size is too large.'));
            }
            const pdf = await fileUploader([file]);
            req.book.pdf = pdf[0];
        }

        const photosSrc = await fileUploader(files);
        req.book.photos = photosSrc;
    }

    const book = await BookModel.create({ ...req.book, userid: req.user._id })
    return res.status(201).json(new ApiResponse(true, "New Book added.", book));
    // return res.status(201).json(new ApiResponse(true, "New Book added.", req.book));
})

const updateBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, "Book id is required."))
    }
    const book = await BookModel.findByIdAndUpdate(id, { ...req.book }, { new: true, runValidators: true })
    if (!book) {
        return next(createError(409, "Invalid book."))
    }

    res.status(200).json(new ApiResponse(true, "Book updated successfully.", book))
})

const deleteBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, "Book id is required."))
    }
    const book = await BookModel.findByIdAndDelete(id)
    if (!book) {
        return next(createError(409, "Invalid book."))
    }

    res.status(200).json(new ApiResponse(true, "Book Deleted successfully.", book))
})

const fetchBooks = asyncHandler(async (req, res, next) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const skip = (page - 1) * limit;

    let booksInCart = await CartModel.findOne({ $and: [{ userid: req.user._id }, { status: "Pending" }] }).populate({
        path: "items",
        select: "bookid" // Include only the bookid and quantity fields
    }).select("-userid -createdAt -updatedAt -__v -status")

    booksInCart.items = booksInCart.items.map((items) => {
        return items.bookid.toString()
    })

    // Construct the aggregation pipeline
    const pipeline = [
        // Sorting stage
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        // Pagination stage
        { $skip: skip },
        { $limit: limit },
        {
            $addFields: {
                isCart: false // Add isCart field with default value false
            }
        }
    ];

    const books = await BookModel.aggregate(pipeline);
    const resBook = books.map(book => {
        if (booksInCart.items.includes(book._id.toString())) {
            book.isCart = true;
        }
        return book;
    });

    res.status(200).json(new ApiResponse(true, "Book fetched successfully.", resBook))
})

const addToCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Book id required."));
    }

    const { quantity } = req.body;

    if (!quantity) {
        return next(createError(422, "Quantity of book required."))
    }

    const isBook = await BookModel.findById(id);
    if (isBook.quantity < +quantity) {
        return next(createError(404, "Product out of stock."))
    }
    let cart = await CartModel.findOne({ $and: [{ userid: _id }, { status: "Pending" }] }).populate(
        {
            path: "items",
            select: "bookid"
        }
    )

    if (!isBook) {
        return next(createError(404, "Invalid book."))
    }

    const cartItem = {
        userid: _id,
        bookid: isBook._id,
        quantity
    }

    const isBookInCart = cart && cart.items && cart.items.some((item) => { return item.bookid.toString() === id })
    if (isBookInCart) {
        return next(createError(409, "Book already available."))
    }

    const newBookForCart = await CartItemModel.create(cartItem)
    if (cart) {
        cart.items.push(newBookForCart._id)
        await cart.save();
    } else {
        cart = await CartModel.create({
            userid: _id,
            items: [newBookForCart._id]
        })
    }

    isBook.quantity -= quantity
    await isBook.save();
    return res.status(200).json(new ApiResponse(true, "Product added to cart.", { cart, newBookForCart }))
})

const updateCart = asyncHandler(async (req, res, next) => {
    const { type, bookid,quantity } = req.query;
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Invalid cart id."))
    }

    const cart = await CartModel.findOne({ $and: [{ _id: id }, { status: "Pending" }] }).populate({
        path: "items",
        select: "bookid quantity"
    })

    if (!cart) {
        return next(createError(404, "Cart not found."))
    }

    const idx = cart.items.findIndex((item, index) => {
        return item.bookid.toString() === bookid;
    })


    if (idx === -1) {
        return next(createError(404, "Invalid book."))
    }

    const book = await BookModel.findById(bookid)
    if (!book) {
        return next(createError(404, "Invalid book."))
    }

    if (type === "delete") {
        book.quantity += cart.items[idx].quantity;
        cart.items.splice(idx, 1);

    } else if (type === "update") {
        const bookForUpdate = cart.items[idx];
        const cartItem = await CartItemModel.findOne({_id:bookForUpdate._id})
        if (cartItem.quantity > quantity) {
            const diff = cartItem.quantity - quantity;
            book.quantity += diff;
            cartItem.quantity = quantity;
        } else {
            const diff = quantity - cartItem.quantity;
            book.quantity -= diff;
            cartItem.quantity = quantity;
        }
        await cartItem.save();
    }

    await book.save();
    if (cart.items.length === 0) {
        await cart.deleteOne();
    } else {
        await cart.save();
    }
    res.status(200).json(new ApiResponse(true, `Cart Updated.`, cart))

})
// @Book management Controllers.
export { addBook, updateBook, deleteBook, fetchBooks };
// @Book Buying Controllers.
export { addToCart, updateCart };