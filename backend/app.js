import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import dbConnect from "./db/dbConnect.js";
import errorHandler from "./middleware/ErrorHandler.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
const app = express();
app.use(cors({
    origin: config.FRONTEND_ORIGINS
}))

app.use(express.json({ limit: "16KB" }))
app.use(express.urlencoded({ extended: true, limit: "16KB" }))
app.use(cookieParser())

app.use("/api/v1/welcome", (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Welcome to book-wook api."
    })
})


// All other Routes
app.use("/api/v1/user", userRouter) // @User Route
app.use("/api/v1/book", bookRouter) // @Book Route


// Global error handler
app.use(errorHandler)

// 404 Route.
app.use("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: "Invalid route"
    })
})


dbConnect().then(() => {
    app.listen(config.PORT, () => {
        console.log("Conceted to server at PORT", config.PORT);
    });
}).catch((err) => {
    console.log("Mongodb err!!", err);
})


