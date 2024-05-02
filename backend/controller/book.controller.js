import asyncHandler from "express-async-handler";
import BookModel from "../models/BookModel.js";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";

const addBook = asyncHandler(async (req, res, next) => {
    const isExist = await BookModel.findOne({ $and: [{ title: req.book.title }, { author: req.book.author }] })
    if (isExist) {
        return next(createError(409, "Cannot create the book. A book with the same title and author already exists!!"))
    }
    const book = await BookModel.create({ ...req.book, userid: req.user._id })
    res.status(201).json(new ApiResponse(true, "New Book added.", book));
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