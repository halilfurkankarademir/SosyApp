import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export default function errorHandler(err, req, res, next) {
    console.error("Hata:", err.stack || err);

    const statusCode = err.status || 500;
    const message = (isProduction && "Bir hata oluştu") || err.message;

    // İstemciye genel bir hata mesajı gönder
    res.status(statusCode).json({ error: message });
}
