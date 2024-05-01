import createError from "http-errors";
import { checkTokenExpiry, verifyAccessToken } from "../utils/utils.js";
import UserModel from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
const admin = asyncHandler(async (req, res, next) => {
    const { accessToken } = req.cookies || req.headers["authorization"].split("Bearer")[1];
    if (!accessToken) {
        return next(createError(400, "Token required."))
    }

    const isValidToken = await verifyAccessToken(accessToken)
    if (!isValidToken) {
        return next(createError(401, "Invalid token."))
    }

    const isExpired = checkTokenExpiry(accessToken)
    if (isExpired) {
        return next(createError(401, "Token expired."))
    }
    const user = await UserModel.findOne({ $and: [{ email: isValidToken.email }, { accessToken }] })
    if (!user) {
        return next(createError(401, "Unauthorized user."))
    }
    if (user.role !== "ADMIN") {
        return next(createError(401, "Unauthorized user."))
    }

    req.user = isValidToken;
    next()
})

const auth = asyncHandler(async (req, res, next) => {
    const { accessToken } = req.cookies || req.headers["authorization"].split("Bearer")[1];
    if (!accessToken) {
        return next(createError(400, "Token required."))
    }

    const isValidToken = await verifyAccessToken(accessToken)
    if (!isValidToken) {
        return next(createError(401, "Invalid token."))
    }

    const isExpired = checkTokenExpiry(accessToken)
    if (isExpired) {
        return next(createError(401, "Token expired."))
    }
    const user = await UserModel.findOne({ $and: [{ email: isValidToken.email }, { accessToken }] })
    if (!user) {
        return next(createError(401, "Unauthorized user."))
    }
    if (user.role !== "ADMIN" || user.role !== "USER") {
        return next(createError(401, "Unauthorized user."))
    }

    req.user = isValidToken;
    next()
})



export { admin };