import AppSettings from "../models/appSettingsModel.js";
import logger from "../utils/logger.js";

/**
 * Uygulama ayarları için repository fonksiyonlarını içerir.
 */
const appSettingsRepository = {
    /**
     * Uygulama ayarlarını veritabanından alır.
     * @returns {Promise<AppSettings>} Uygulama ayarları.
     */
    async getAppSettings() {
        try {
            const settings = await AppSettings.findOne({ where: { id: 1 } });
            return settings;
        } catch (error) {
            logger.error("Error fetching app settings:", error);
            throw new Error("Error fetching app settings");
        }
    },

    /**
     * Uygulama ayarlarını günceller.
     * @param {Object} settings - Güncellenecek ayarlar.
     * @returns {Promise<AppSettings>} Güncellenmiş uygulama ayarları.
     */
    async updateAppSettings(settings) {
        try {
            const updatedSettings = await AppSettings.update(settings, {
                where: { id: 1 },
            });
            return updatedSettings;
        } catch (error) {
            logger.error("Error updating app settings:", error);
            throw new Error("Error updating app settings");
        }
    },
};

export default appSettingsRepository;
