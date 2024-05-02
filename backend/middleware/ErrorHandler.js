import config from "../config/config.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!!"
    res.status(statusCode).json({
        status: false,
        message: message,
        err: config.NODE_ENV === 'production' ? null : err,
        stack: config.NODE_ENV === 'production' ? null : err.stack,
    });
}

export default errorHandler;