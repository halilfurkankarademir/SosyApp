import savedRepository from "../repositories/savedRepository.js";
import PostService from "./postService.js";

/**
 * Kaydetme ve silme işlemleriyle ilgili servis fonksiyonları.
 * @namespace savedService
 */

const savedService = {
    /**
     * Belirli bir kullanıcının belirli bir gönderiyi kaydetmesini sağlar.
     * @memberof savedService
     * @param {string} userId - Gönderiyi kaydeden kullanıcının ID'si.
     * @param {number} postId - Kaydedilecek gönderinin ID'si.
     * @returns {Promise<Saved>} Oluşturulan kayıtlı gönderi kaydını döndürür.
     * @throws {Error} Kaydetme işlemi sırasında bir hata oluşursa.
     */
    async savePost(userId, postId) {
        try {
            return await savedRepository.createSaved(userId, postId);
        } catch (error) {
            console.error("Error saving post:", error);
            throw error;
        }
    },

    /**
     * Belirli bir kullanıcının belirli bir gönderiye ait kaydı silmesini sağlar.
     * @memberof savedService
     * @param {string} userId - Kaydı silen kullanıcının ID'si.
     * @param {number} postId - Kaydı silinecek gönderinin ID'si.
     * @returns {Promise<number>} Silinen kayıt sayısını (genellikle 1) döndürür.
     * @throws {Error} Kayıt silme işlemi sırasında bir hata oluşursa.
     */
    async unsavePost(userId, postId) {
        try {
            return await savedRepository.deleteSaved(userId, postId);
        } catch (error) {
            console.error("Error un-saving post:", error);
            throw error;
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği tüm gönderileri getirir.
     * @memberof savedService
     * @param {string} userId - Kaydedilmiş gönderileri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<Saved>>} Kullanıcının kaydettiği gönderilerin (veya Saved kayıtlarının) dizisini döndürür.
     * @throws {Error} Kaydedilmiş gönderileri getirme işlemi sırasında bir hata oluşursa.
     */
    async getSavedPosts(userId) {
        try {
            return await PostService.getSavedPostsByUserId(userId);
        } catch (error) {
            console.error("Error getting saved posts:", error);
            throw error;
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği tüm gönderilerin ID'lerini getirir.
     * @memberof savedService
     * @param {string} userId - Kaydedilmiş gönderi ID'leri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<number>>} Kullanıcının kaydettiği gönderi ID'lerinin dizisini döndürür.
     * @throws {Error} Kaydedilmiş gönderi ID'lerini bulma işlemi sırasında bir hata oluşursa.
     */
    async findSavedPostIdsByUserId(userId) {
        try {
            return await savedRepository.findAllSavedPostIdsByUser(userId);
        } catch (error) {
            console.log("Error finding saved post IDs by user ID:", error);
            throw error;
        }
    },
};

export default savedService;
