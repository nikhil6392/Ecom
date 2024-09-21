import dotenv from "dotenv"

dotenv.config()

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
    MONGODB_URI:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    SMTP_MAIL_HOST:process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT:process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME:process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD:process.env.SMTP_MAIL_PASSWORD,
    SMTP_EMAIL:process.env.SMTP_EMAIL

}

export default config