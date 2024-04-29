import config from "../config/config.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || "Something went wrong!!"
    res.status(statusCode).json({
        status: statusCode <= 200,
        message: message,
        err: config.NODE_ENV === 'production' ? null : err,
        stack: config.NODE_ENV === 'production' ? null : err.stack,
    });
}

export default errorHandler;