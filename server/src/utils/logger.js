import winston from "winston";
const { combine, label, printf, colorize, json } = winston.format;

// Ortak timestamp formatı
const timestampFormat = {
    format: "YYYY-MM-DD HH:mm:ss",
};

// Gelişmiş log formatı
const logFormat = printf(
    ({ level, message, label, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${label}] ${level}: ${message}`;

        if (metadata && Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata)}`;
        }

        return msg;
    }
);

const level = process.env.NODE_ENV === "production" ? "info" : "debug";

const logger = winston.createLogger({
    level,
    format: combine(
        label({ label: "SosyApp" }),
        winston.format.timestamp(timestampFormat),
        logFormat
    ),
    transports: [
        // Konsol çıktısı (renkli)
        new winston.transports.Console({
            format: combine(
                colorize(),
                label({ label: "SosyApp" }),
                winston.format.timestamp(timestampFormat),
                logFormat
            ),
        }),
        // Dosya çıktısı (renksiz)
        new winston.transports.File({
            filename: "logs/app.log",
            maxsize: 5242880,
            maxFiles: 5,
            format: combine(
                label({ label: "SosyApp" }),
                winston.format.timestamp(timestampFormat),
                logFormat
            ),
        }),
    ],
});

process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection:", reason);
});

export default logger;
