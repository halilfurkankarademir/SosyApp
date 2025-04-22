export const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
