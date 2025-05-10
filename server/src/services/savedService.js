/**
 * Kaydetme ve silme işlemleriyle ilgili servis fonksiyonları.
 */

import createHttpError from "http-errors";

const savedService = (savedRepository, PostService) => ({
    /**
     * Belirli bir kullanıcının belirli bir gönderiyi kaydetmesini sağlar.
     * @param {string} userId - Gönderiyi kaydeden kullanıcının ID'si.
     * @param {number} postId - Kaydedilecek gönderinin ID'si.
     * @returns {Promise<Saved>} Oluşturulan kayıtlı gönderi kaydını döndürür.
     */
    async savePost(userId, postId) {
        try {
            return await savedRepository.createSaved(userId, postId);
        } catch (error) {
            throw createHttpError(500, "Failed to save post.");
        }
    },

    /**
     * Belirli bir kullanıcının belirli bir gönderiye ait kaydı silmesini sağlar.
     * @param {string} userId - Kaydı silen kullanıcının ID'si.
     * @param {number} postId - Kaydı silinecek gönderinin ID'si.
     * @returns {Promise<number>} Silinen kayıt sayısını (genellikle 1) döndürür.
     */
    async unsavePost(userId, postId) {
        try {
            return await savedRepository.deleteSaved(userId, postId);
        } catch (error) {
            throw createHttpError(500, "Failed to unsave post.");
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği tüm gönderileri getirir.
     * @param {string} userId - Kaydedilmiş gönderileri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<Saved>>} Kullanıcının kaydettiği gönderilerin (veya Saved kayıtlarının) dizisini döndürür.
     */
    async getSavedPosts(userId) {
        try {
            return await PostService.getSavedPostsByUserId(userId);
        } catch (error) {
            throw createHttpError(500, "Failed to get saved posts.");
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği tüm gönderilerin ID'lerini getirir.
     * @param {string} userId - Kaydedilmiş gönderi ID'leri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<number>>} Kullanıcının kaydettiği gönderi ID'lerinin dizisini döndürür.
     */
    async findSavedPostIdsByUserId(userId) {
        try {
            return await savedRepository.findAllSavedPostIdsByUser(userId);
        } catch (error) {
            throw createHttpError(500, "Failed to find saved post IDs.");
        }
    },
});

export default savedService;
