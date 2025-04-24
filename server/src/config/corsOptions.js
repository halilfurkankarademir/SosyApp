export const corsConfig = {
    origin: "https://sosyapp.vercel.app",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
