import mongoose from "mongoose";
import config from "../config/config.js";
const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("connected with db!");
        })

        mongoose.connection.on("disconnected", () => {
            console.log("Mongodb disconnected");
        })

        mongoose.connection.on("error", (err) => {
            console.log("Mongodb error", err);
        })
        await mongoose.connect(config.DB_URI)
    } catch (error) {
        console.log("Error while connecting db!!", error);
    }
}


export default dbConnect;