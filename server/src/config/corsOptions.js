/**
 * CORS (Cross-Origin Resource Sharing) ayarlarını yapılandıran nesneyi tanımlar.
 */

const isDev = process.env.NODE_ENV === "development";

// CORS ayarlarını tanımlayan nesne
export const corsConfig = {
    origin: isDev ? "http://localhost:5173" : "https://www.auroratones.online", // Geliştirme veya üretim origin'i
    credentials: true, // Cookie gibi bilgilerin gönderilmesine izin ver
    exposedHeaders: ["Set-Cookie"], // İstemcinin Set-Cookie başlığını okumasına izin ver
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // İzin verilen HTTP metodları
};
