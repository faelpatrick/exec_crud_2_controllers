require("dotenv");

export default {
    secret: process.env.APP_SECRET,
    expiresIn: "7d"
}