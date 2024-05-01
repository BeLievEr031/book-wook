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
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: "8h" })
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
    return { accessToken, refreshToken };
}

const generateVerificationToken = (payload) => {
    if (!payload || typeof payload !== "object") {
        throw createError(422, "Invalid payload.")
    }
    const verificationToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: "24h" })
    return verificationToken;
}

const verifyAccessToken = async (token) => {
    return await jwt.verify(token, config.ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = async (token) => {
    return await jwt.verify(token, config.REFRESH_TOKEN_SECRET);
}

const checkTokenExpiry = (expirationTime) => {
    const expirationTimeMs = expirationTime * 1000;

    // Create a new Date object with the expiration time
    const expirationDate = new Date(expirationTimeMs);

    // Get today's date
    const today = new Date();

    // Compare the expiration date with today's date
    if (expirationDate < today) {
        return true;
    } else {
        return false;
    }
}
export { comparePassword, createTokens, generateVerificationToken, verifyAccessToken, verifyRefreshToken, checkTokenExpiry }