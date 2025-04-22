export default function errorHandler(err, req, res, next) {
    console.error("Hata:", err.stack || err);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    // İstemciye genel bir hata mesajı gönder
    res.status(statusCode).json({ error: message });
}
