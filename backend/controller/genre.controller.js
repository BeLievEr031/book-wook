import asyncHandler from "express-async-handler";
import GenreModel from "../models/GenreModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import createError from "http-errors"

const addGenre = asyncHandler(async (req, res, next) => {
    const isExist = await GenreModel.findOne({ name: req.body.name.trim() });
    if (isExist) {
        return next(createError(409, "Genre Already exist."))
    }
    const genre = await GenreModel.create({ ...req.body })
    res.status(200).json(new ApiResponse(true, "Genre Created successfully.", genre))
})

const updateGenre = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Genre id required!!"))
    }
    const isExist = await GenreModel.findOne({ name: req.body.name.trim() });
    if (isExist) {
        return next(createError(409, "Cannot update Genre Already exist."))
    }

    const genre = await GenreModel.findByIdAndUpdate(id, { ...req.body }, {
        new: true, runValidators: true
    })

    if (!genre) {
        return next(createError(404, "Invalid genre!!"))
    }
    res.status(200).json(new ApiResponse(true, "Genre updated successfully.", genre))
})

const deleteGenre = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Genre id required!!"))
    }
    const genre = await GenreModel.findByIdAndDelete(id)
    if (!genre) {
        return next(createError(404, "Invalid genre!!"))
    }
    res.status(200).json(new ApiResponse(true, "Genre deleted successfully.", genre))
})

const fetchGenre = asyncHandler(async (req, res, next) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const skip = (page - 1) * limit;
    // Construct the aggregation pipeline
    const pipeline = [
        // Sorting stage
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        // Pagination stage
        { $skip: skip },
        { $limit: limit },
        { $project: { _id: 1, name: 1,description:1 } }
    ];

    // Execute the aggregation pipeline
    const genres = await GenreModel.aggregate(pipeline);
    res.status(200).json(new ApiResponse(true, "Genre fetched successfully.", genres))
})

export { addGenre, updateGenre, deleteGenre, fetchGenre };