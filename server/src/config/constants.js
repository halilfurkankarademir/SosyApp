// sabit degerler

module.exports = {
    API_ENDPOINTS: {
        USERS: "/users",
        POSTS: "/posts",
        LIKES: "/likes",
        FOLLOWS: "/follows",
        COMMENTS: "/comments",
        NOTIFICATIONS: "/notifications",
    },
    HTTP_STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        SERVER_ERROR: 500,
    },
    ERROR_MESSAGES: {
        USER_NOT_FOUND: "Kullanıcı bulunamadı",
        POST_NOT_FOUND: "Gönderi bulunamadı",
        LIKE_NOT_FOUND: "Begeni bulunamadı",
        FOLLOW_NOT_FOUND: "Takip bulunamadı",
        COMMENT_NOT_FOUND: "Yorum bulunamadı",
        NOTIFICATION_NOT_FOUND: "Bildirim bulunamadı",
        SERVER_ERROR: "Sunucu hatası",
        BAD_REQUEST: "Geçersiz istek",
        UNAUTHORIZED: "Kimlik doğrulama gerekiyor",
        FORBIDDEN: "Bu işlem için yetkiniz yok",
    },
    SUCCESS_MESSAGES: {
        CREATED: "{entity} başarıyla oluşturuldu",
        UPDATED: "{entity} başarıyla güncellendi",
        DELETED: "{entity} başarıyla silindi",
    },
    LIMITS: {
        MAX_FILE_SIZE: 10 * 1024 * 1024, //maximum 10 mb dosya boyutu kabul edilir
    },
    ENV: {
        PRODUCTION: "production",
        DEVELOPMENT: "development",
        PORT: process.env.PORT || 3000,
    },
    TOKEN_EXPIRES: {
        ONE_HOUR: "1h",
        ONE_DAY: "1d",
        ONE_WEEK: "7d",
        ONE_MONTH: "30d",
    },
};
