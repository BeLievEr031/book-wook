import asyncHandler from "express-async-handler";
import BookModel from "../models/BookModel.js";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import { convertIntoMB, fileUploader } from "../utils/utils.js";
import GenreModel from "../models/GenreModel.js";

const addBook = asyncHandler(async (req, res, next) => {
    const isGenre = await GenreModel.findById({_id:req.book.genreid})
    if(!isGenre){
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
    // Construct the aggregation pipeline
    const pipeline = [
        // Sorting stage
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        // Pagination stage
        { $skip: skip },
        { $limit: limit },
        // { $project: { _id: 1, name: 1, author: 1, role: 1 } }
    ];
    // Execute the aggregation pipeline
    const books = await BookModel.aggregate(pipeline);
    res.status(200).json(new ApiResponse(true, "Book fetched successfully.", books))
})

export { addBook, updateBook, deleteBook, fetchBooks };