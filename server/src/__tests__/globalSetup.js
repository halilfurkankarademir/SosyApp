import { initializeServer } from "../app.js";

// Sunucu baslatma islemi
export default async () => {
    try {
        console.log(
            "Jest Global Setup: Testler baslıyor, sunucu başlatılıyor..."
        );
        const serverObj = await initializeServer();

        console.log(serverObj);

        global.__SERVER_APP__ = serverObj.app;

        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("Jest Global Setup: Sunucu başarıyla başlatıldı.");
    } catch (error) {
        console.error("Jest Global Setup: Sunucu baslatılamadı.", error);
        process.exit(1);
    }
};
