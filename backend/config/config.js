import dotenv from "dotenv"
dotenv.config()

const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    FRONTEND_ORIGINS: process.env.FRONTEND_ORIGINS,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    VERIFY_TOKEN_SECRET: process.env.VERIFY_TOKEN_SECRET,

    // SMTP Config
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    // RESEND Config
    RESEND_EMAIL: process.env.RESEND_EMAIL,
    RESEND_TOKEN: process.env.RESEND_TOKEN,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

})

export default config;