export const corsConfig = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
