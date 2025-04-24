export const corsConfig = {
    origin: "http://localhost:5173" || "https://sosyapp.vercel.app",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
