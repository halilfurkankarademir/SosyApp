import sequelize from "./sequelize.js";

export async function initializeDatabase() {
    try {
        // Bağlantıyı test et
        await sequelize.authenticate();
        console.log("Veritabanı bağlantısı başarılı!");

        // Model bağımlılıklarını doğru şekilde yükle
        await import("../models/userModel.js");
        await import("../models/postModel.js");

        // Tablolar oluşturul/güncellenir
        await sequelize.sync({ alter: true });
        console.log("Veritabanı tabloları senkronize edildi!");

        return sequelize;
    } catch (error) {
        console.error("PostgreSQL bağlantı hatası:", error);
        throw error; // Hatayı yukarı fırlat
    }
}
