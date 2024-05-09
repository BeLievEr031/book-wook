import asyncHandler from "express-async-handler";
import BookModel from "../models/BookModel.js";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import { convertIntoMB, deleteFile, fileUploader } from "../utils/utils.js";
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

        const photosSrc = await fileUploader(files);
        req.book.photos = photosSrc;
    }

    // TODO: Another way to upload the Large PDF 
    // uploading book pdf if provided.
    if (req.files && req.files.pdf) {
        const file = req.files.pdf
        const MB = convertIntoMB(file.size)
        if (MB > 20) {
            return next(createError(413, 'PDF File size is too large.'));
        }
        const pdf = await fileUploader([file]);
        req.book.pdf = pdf[0];
    }

    const book = await BookModel.create({ ...req.book, userid: req.user._id })
    return res.status(201).json(new ApiResponse(true, "New Book added.", book));
    // return res.status(201).json(new ApiResponse(true, "New Book added.", req.book));
})

const updateBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, description, price, isForSale, isForRent, rentalPrice, rating, genreid, quantity, isActive } = req.book;

    if (!id) {
        return next(createError(400, "Book id is required."))
    }

    const book = await BookModel.findById(id)
    // console.log(book.photos);
    if (!book) {
        return next(createError(409, "Invalid book."))
    }

    const previousPhotos = book.photos.filter((photo) => {
        if (req.book.photos.includes(photo)) {
            return photo;
        }
    })

    // Uploading a thumbnail if provided by user.
    if (req.files && req.files.thumbnail) {
        const file = req.files.thumbnail
        const MB = convertIntoMB(file.size)
        if (MB > 2) {
            return next(createError(413, 'Thumbnail File size is too large.'));
        }
        const fileSrcArr = ["book-wook/" + req.book.thumbnail.split("book-wook")[1].split(".")[0]]
        const thumbnailSrc = await fileUploader([file]);
        req.book.thumbnail = thumbnailSrc[0];
        await deleteFile(fileSrcArr)
    }

    // Uploading book images if provided by user.
    if (req.files && req.files.length !== 0 && req.files.images) {
        const files = req.files.images.length ? req.files.images : [req.files.images];
        if (files.length && (previousPhotos.length + files.length) > 4) {
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

        const photosSrc = await fileUploader(files);

        // TODO::remove previous 
        const photosToDelete = [];
        for (let i = 0; i < book.photos.length; i++) {
            const photo = book.photos[i]
            if (!req.book.photos.includes(photo)) {
                photosToDelete.push("book-wook" + photo.split("book-wook")[1].split(".")[0]);
            }
        }

        req.book.photos = [...previousPhotos, ...photosSrc];
        photosToDelete.length !== 0 && await deleteFile(photosToDelete)
    }

    // TODO: Another way to upload the Large PDF 
    // uploading book pdf if provided.
    if (req.files && req.files.pdf) {
        const file = req.files.pdf
        const MB = convertIntoMB(file.size)
        if (MB > 20) {
            return next(createError(413, 'PDF File size is too large.'));
        }
        const fileSrcArr = ["book-wook/" + req.book.pdf.split("book-wook")[1].split(".")[0]]
        const pdf = await fileUploader([file]);
        req.book.pdf = pdf[0];
        await deleteFile(fileSrcArr)
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.price = price;
    book.isForSale = isForSale;
    book.isForRent = isForRent;
    book.rentalPrice = rentalPrice;
    book.rating = rating;
    book.quantity = quantity;
    book.genreid = genreid;
    book.isActive = isActive;
    book.thumbnail = req.book.thumbnail;
    book.photos = req.book.photos;
    book.pdf = req.book.pdf;

    await book.save();

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
    // Construct the aggregation pipeline
    const pipeline = [
        // Sorting stage
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        // Pagination stage
        { $skip: skip },
        { $limit: limit },
    ];

    const books = await BookModel.aggregate(pipeline);
    res.status(200).json(new ApiResponse(true, "Book fetched successfully.", books))
})


// @Version1 Approach
const addToCartV1 = asyncHandler(async (req, res, next) => {
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

const updateCartV1 = asyncHandler(async (req, res, next) => {
    const { type, bookid, quantity } = req.query;
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
        const cartItem = await CartItemModel.findOne({ _id: bookForUpdate._id })
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

const fetchCartV1 = asyncHandler(async (req, res, next) => {
    const { limit, page } = req.query;
    const { _id } = req.user;

    const cart = await CartModel.findOne({ $and: [{ userid: _id }, { status: "Pending" }] }).populate({
        path: 'items',
        model: "CartItemModel",
        select: "quantity",
        limit: limit,
        skip: (page - 1) * limit,
        populate: {
            path: 'bookid',
            model: 'BookModel',
            select: "title author description price thumbnail",
            options: { as: 'bookName' },
            populate: {
                path: "genreid",
                model: "GenreModel",
                select: "name"
            }
        }
    });

    let totalPrice = 0;
    const sanitizedCartArr = cart.items.map((bookDetails) => {
        const obj = {
            quantity: bookDetails.quantity,
            itemid: bookDetails._id,
            bookid: bookDetails.bookid._id,
            genre: bookDetails.bookid.genreid.name,
            title: bookDetails.bookid.title,
            author: bookDetails.bookid.author,
            description: bookDetails.bookid.description,
            thumbnail: bookDetails.bookid.thumbnail,
            price: bookDetails.bookid.price,
        }
        totalPrice += (bookDetails.bookid.price * bookDetails.quantity);
        return obj;
    })

    const sanitizedCart = { cartid: cart._id, items: sanitizedCartArr, totalPrice, totalItems: sanitizedCartArr.length }
    res.status(200).json(new ApiResponse(true, "Cart fetched.", sanitizedCart))
})

// @Version2 Approach
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

    const book = await BookModel.findById(id);

    if (!book) {
        return next(createError(404, "Invalid book."))
    }

    if (book.quantity < +quantity) {
        return next(createError(404, "Product out of stock."))
    }

    const bookInCart = await CartItemModel.findOne({ $and: [{ userid: _id }, { bookid: id }, { status: "CART" }] })
    if (bookInCart) {
        return next(createError(409, "Book already available."))
    }

    const cartItem = {
        userid: _id,
        bookid: book._id,
        quantity
    }
    const newBookForCart = await CartItemModel.create(cartItem);

    book.quantity -= quantity
    await book.save();
    return res.status(200).json(new ApiResponse(true, "Product added to cart.", newBookForCart))
})

const updateCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Book id required!!"))
    }
    const { type, quantity } = req.query;
    const cartItem = await CartItemModel.findOne({ $and: [{ userid: _id }, { bookid: id }, { status: "CART" }] })
    if (!cartItem) {
        return next(createError(404, "Invalid book."))
    }

    const book = await BookModel.findById(cartItem.bookid);
    if (!book) {
        return next(createError(404, "Invalid book."))
    }

    if (type === "delete") {
        await cartItem.deleteOne();
        book.quantity += cartItem.quantity;
    } else if (type === "update") {
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

    res.status(200).json(new ApiResponse(true, `Cart Updated.`, cartItem))
})

const fetchCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { page, limit } = req.query;
    const cartItems = await CartItemModel.find({ userid: _id, status: "CART" }).populate({
        path: "bookid",
        model: "BookModel",
        select: "title description thumbnail price rating author"
    }).skip((page - 1) * limit).limit(limit);

    res.status(200).json(new ApiResponse(true, "Books fetched.", cartItems))
})

// @Book management Controllers.
export { addBook, updateBook, deleteBook, fetchBooks };
// @Book Buying Controllers.
export { addToCart, updateCart, fetchCart };