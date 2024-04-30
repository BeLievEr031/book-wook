import asyncHandler from "express-async-handler"
import UserModel from "../models/UserModel.js"
import createError from "http-errors"
import ApiResponse from "../utils/ApiResponse.js"
import { comparePassword, createTokens, generateVerificationToken } from "../utils/utils.js"
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

export { register, login, verifyAccount };