import dotenv from "dotenv"
dotenv.config()

const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    FRONTEND_ORIGINS: process.env.FRONTEND_ORIGINS,
    NODE_ENV: process.env.NODE_ENV
})

export default config;