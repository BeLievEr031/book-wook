import asyncHandler from "express-async-handler"
import UserModel from "../models/UserModel.js"
import createError from "http-errors"
import ApiResponse from "../utils/ApiResponse.js"
import { checkTokenExpiry, comparePassword, createTokens, generateVerificationToken, toObjectId, verifyRefreshToken } from "../utils/utils.js"
import { verificationTemplete } from "../constant/emailTemplate.js"
import { sendEmailWithResend } from "../utils/email.utility.js"

const register = asyncHandler(async (req, res, next) => {
    const isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) {
        return next(createError(409, "User already exists."))
    }

    const verificationToken = generateVerificationToken(req.body)
    const user = await UserModel.create({ ...req.body, verifyToken: verificationToken })
    const template = verificationTemplete(verificationToken)
    const data = await sendEmailWithResend(template, req.body.email)
    res.status(200).json(new ApiResponse(true, "User registered and verification token send on email.", user))
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const isUser = await UserModel.findOne({ $and: [{ email }, { isVerified: true }] }).select("+password")
    if (!isUser) {
        return next(createError(401, "Unauthorized user email or password!! z"))
    }

    const isValidPassword = await comparePassword(password, isUser.password)
    if (!isValidPassword) {
        return next(createError(401, "Unauthorized user email or password!!"))
    }

    const payload = {
        _id: isUser._id,
        email: isUser.email,
        name: isUser.name
    }

    const { accessToken, refreshToken } = createTokens(payload)
    isUser.accessToken = accessToken;
    isUser.refreshToken = refreshToken;
    await isUser.save();

    res.status(200)
        .cookie("accessToken", accessToken, {
            maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
            httpOnly: true
        })
        .cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true
        })
        .json(new ApiResponse(true, "User logged in successfully.", { ...payload, accessToken, refreshToken }))
});

const verifyAccount = asyncHandler(async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return next(createError(401, "Invalid token"));
    }
    const user = await UserModel.findOne({ verifyToken: token })
    if (!user) {
        return next(createError(401, "Invalid tokxxfsen"));
    }

    user.isVerified = true;
    user.verifyToken = null;
    await user.save();
    res.status(200).json(new ApiResponse(true, "User verified successfully.", null))

})

const refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies || req.headers["authorization:"].split("Bearer")[1]
    if (!refreshToken) {
        return next(createError(422, "Token required!"))
    }
    const isValid = await verifyRefreshToken(refreshToken);
    if (!isValid) {
        return next(createError(409, "Invalid token."))
    }

    // TODO: Testing for expired token.
    const isExpire = checkTokenExpiry(isValid.exp)
    if (isExpire) {
        return res.status(401).json(new ApiResponse(false, "Token is expired.", null))
    }

    const isUser = await UserModel.findOne({ $and: [{ email: isValid.email }, { refreshToken }] });
    if (!isUser) {
        return next(createError(409, "Invalid user."))
    }

    const payload = {
        _id: isUser._id,
        email: isUser.email,
        name: isUser.name
    }

    const tokens = createTokens(payload)
    isUser.accessToken = tokens.accessToken;
    isUser.refreshToken = tokens.refreshToken;
    await isUser.save();

    res.status(200)
        .cookie("accessToken", tokens.accessToken, {
            maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
            httpOnly: true
        })
        .cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true
        })
        .json(new ApiResponse(true, "Token refreshed!!", null))
})

const fetchUser = asyncHandler(async (req, res, next) => {
    const { page, limit, sortBy, sortOrder } = req.query;
    const skip = (page - 1) * limit;
    // Construct the aggregation pipeline
    const pipeline = [
        // Sorting stage
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        // Pagination stage
        { $skip: skip },
        { $limit: limit },
        // Projection stage to filter only 'name' and 'email' fields
        { $project: { _id: 1, name: 1, email: 1, role: 1 } }
    ];

    // Execute the aggregation pipeline
    const users = await UserModel.aggregate(pipeline);
    res.status(200).json(new ApiResponse(true, "User fetched successfully.", users))
})

const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true, runValidators: true })
    if (!user) {
        return next(createError(404, "Invalid user!!"))
    }
    res.status(200).json(new ApiResponse(true, "User updated successfully.", user))
})

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(422, "User id required.")
    }
    const user = await UserModel.findByIdAndDelete(id)
    if (!user) {
        return next(createError(404, "Invalid user!!"))
    }
    res.status(200).json(new ApiResponse(true, "User deleted successfully.", user))
})


export { register, login, verifyAccount, refreshToken, fetchUser, updateUser, deleteUser };

// 9321590557 rupesh sir