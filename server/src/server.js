import { initializeServer } from "./app.js";

const port = process.env.PORT || 3000;

async function startServer() {
    try {
        console.log("Sunucu baslatiliyor...");
        const { server } = await initializeServer();

        const runningServer = server.listen(port, () => {
            console.log(`Sunucu ${port} portunda çalışıyor`);
        });
        const gracefulShutdown = async (signal) => {
            console.log(`${signal} alındı. Sunucu kapatılıyor...`);
            runningServer.close(async () => {
                console.log("HTTP sunucusu kapatıldı.");
                try {
                    // Veritabanı havuzunu da kapat
                    await pool.end();
                    console.log("Veritabanı havuzu kapatıldı.");
                } catch (dbError) {
                    console.error(
                        "Veritabanı havuzu kapatılırken hata:",
                        dbError
                    );
                } finally {
                    process.exit(0); // Başarıyla çık
                }
            });
        };

        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

startServer();
