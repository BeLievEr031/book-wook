import bcrypt from "bcrypt"
import createError from "http-errors";
import jwt from "jsonwebtoken"
import config from "../config/config.js";
import path from "path"
import fs from "fs"
import cloudinary from "../config/cloudinary.js";
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

const toObjectId = async (stringID) => {
    try {
        if (!stringID) {
            throw createError(400, "stringID required.")
        }

        console.log(stringID);
        const objectId = await new mongoose.Types.ObjectId(stringID);
        console.log(objectId);
        return objectId;
    } catch (error) {
        throw createError(422, "Invalid ObjectId.")
    }
}

const fileUploader = async (file) => {
    const imageUrl = [];

    // Create a function to handle file upload
    const uploadFile = async (file) => {
        const uploadPath = path.join(process.cwd(), 'uploads', file.name);
        return new Promise((resolve, reject) => {
            file.mv(uploadPath, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        // Upload file to Cloudinary
                        const cloudinaryResult = await cloudinary.uploader.upload(uploadPath, { folder: "book-wook" });
                        // Cloudinary response will contain the URL of the uploaded file
                        imageUrl.push(cloudinaryResult.secure_url)
                        // imageUrl.push(uploadPath);

                        fs.unlink(uploadPath, (err) => {
                            if (err) {
                                throw createError(500, err.message)
                            }
                            console.log("File deleted.");
                        })
                        resolve();
                    } catch (error) {
                        console.log(error);
                        throw createError(500, error.message)
                    }
                }
            });
        })
    };

    // Iterate over each file and upload it
    for (let i = 0; i < file.length; i++) {
        try {
            await uploadFile(file[i]);
        } catch (error) {
            console.error('File upload error:', error);
            throw createError(500, 'File upload failed');
        }
    }
    return imageUrl;
}

const deleteFile = async (fileSrcArr) => {
    // ['book-wook/okb7kexy4vmfew2ytvim']
    console.log(fileSrcArr);
    try {
        await cloudinary.api
            .delete_resources(fileSrcArr,
                { type: 'upload', resource_type: 'image' })
        console.log("File deleted.");
    }
    catch (error) {
        throw createError(500, error.message)
    }
}

const convertIntoMB = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes;
}

export { comparePassword, createTokens, generateVerificationToken, verifyAccessToken, verifyRefreshToken, checkTokenExpiry, toObjectId }

export { fileUploader, deleteFile, convertIntoMB };