/**
 * Uygulama sunucusunu başlatan ve graceful shutdown mekanizmasını yöneten ana giriş noktası.
 */
import { initializeServer } from "./app.js";
import sequelize from "./config/sequelize.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 3000;

/**
 * Uygulama sunucusunu başlatır.
 * Önce `initializeServer` ile Express uygulaması, HTTP sunucusu ve diğer bileşenler hazırlanır.
 * Ardından HTTP sunucusu belirtilen portta dinlemeye başlar.
 * SIGTERM ve SIGINT sinyallerini dinleyerek graceful shutdown (düzgün kapatma) işlemini gerçekleştirir.
 * @async
 * @function startServer
 * @throws {Error} Sunucu başlatma veya kapatma sırasında bir hata olursa konsola yazdırır ve işlemi sonlandırır.
 */
async function startServer() {
    try {
        logger.info("Sunucu baslatiliyor...");

        const { server } = await initializeServer();

        // HTTP sunucusunu belirtilen portta dinlemeye başla
        const runningServer = server.listen(port, () => {
            logger.info(`Sunucu ${port} portunda baslatildi.`);
        });

        /**
         * Uygulamayı düzgün bir şekilde kapatan fonksiyon.
         * Gelen sinyali loglar, HTTP sunucusunu kapatır,
         * veritabanı havuzunu sonlandırır ve işlemi başarıyla bitirir.
         * @param {string} signal - Kapatma işlemini tetikleyen sinyal ('SIGTERM' veya 'SIGINT').
         */
        const gracefulShutdown = async (signal) => {
            logger.info(`Sunucu kapatılıyor... (${signal})`);
            runningServer.close(async () => {
                logger.info("Sunucu kapatıldı.");
                try {
                    await sequelize.close();
                    logger.info("Veritabanı havuzu kapatıldı.");
                } catch (dbError) {
                    logger.error(
                        "Veritabanı havuzu kapatılırken bir hata olustu:",
                        dbError
                    );
                } finally {
                    process.exit(0);
                }
            });
        };

        // Kapatma sinyallerini dinle
        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    } catch (e) {
        logger.error("Sunucu baslatılırken bir hata olustu:", e);
        process.exit(1);
    }
}

// Sunucuyu başlat
startServer();
