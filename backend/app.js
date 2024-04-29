import express from "express";
import cors from "cors"
import config from "./config/config.js";
import dbConnect from "./db/dbConnect.js";
import errorHandler from "./middleware/ErrorHandler.js";
const app = express();
app.use(cors({
    origin: config.FRONTEND_ORIGINS
}))

app.use("/api/v1/welcome", (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Welcome to book-wook api."
    })
})


// Global error handler
app.use(errorHandler)

dbConnect().then(() => {
    app.listen(config.PORT, () => {
        console.log("Conceted to server at PORT", config.PORT);
    });
}).catch((err) => {
    console.log("Mongodb err!!", err);
})


