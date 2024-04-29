import dotenv from "dotenv"
dotenv.config()

const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    FRONTEND_ORIGINS:process.env.FRONTEND_ORIGINS
})

export default config;