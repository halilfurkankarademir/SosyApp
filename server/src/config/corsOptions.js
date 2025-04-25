import dotenv from "dotenv";
dotenv.config();

const isDev = process.env.NODE_ENV === "development";

export const corsConfig = {
    // Gelistirme modu aktifse localdeki React uygulama adresi
    // Uygulama yayinlandiysa vercel uygulama adresi
    origin: isDev ? "http://localhost:5173" : "https://sosyapp.vercel.app",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
