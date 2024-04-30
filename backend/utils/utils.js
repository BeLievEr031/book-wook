import bcrypt from "bcrypt"
import createError from "http-errors";
import jwt from "jsonwebtoken"
import config from "../config/config.js";
const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw createError(422, "password and hashedPassword required!")
    }
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

// Payload must be an object.
const createTokens = (payload) => {
    if (!payload || typeof payload !== "object") {
        throw createError(422, "Invalid payload.")
    }
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET,{expiresIn:"8h"})
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    return { accessToken, refreshToken };
}

const generateVerificationToken = (payload) =>{
    if (!payload || typeof payload !== "object") {
        throw createError(422, "Invalid payload.")
    }
    const verificationToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET,{expiresIn:"24h"})
    return verificationToken;
}
export { comparePassword,createTokens,generateVerificationToken }