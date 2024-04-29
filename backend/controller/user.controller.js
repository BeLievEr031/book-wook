import asyncHandler from "express-async-handler"
import UserModel from "../models/UserModel.js"
import createError from "http-errors"
import ApiResponse from "../utils/ApiResponse.js"
const register = asyncHandler(async (req, res, next) => {
    const isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) {
        return next(createError(409, "User already exists."))
    }
    const user = await UserModel.create(req.body)
    res.status(200).json(new ApiResponse(true, "User registered.", user))
})





export { register };