/**
 * Kaydedilen gönderi veritabanı işlemlerini yönetir.
 */

import Saved from "../models/savedModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const savedRepository = {
    /**
     * Yeni bir 'kaydedilen gönderi' ilişkisi oluşturur.
     * @param {string} userId - Kaydeden kullanıcının ID'si.
     * @param {number} postId - Kaydedilen gönderinin ID'si.
     * @returns {Promise<Saved>} Oluşturulan Saved modeli örneği.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async createSaved(userId, postId) {
        // Not: Zaten kaydedilmişse Sequelize hata fırlatabilir (unique constraint varsa).
        return await Saved.create({ userId, postId });
    },

    /**
     * Belirli bir 'kaydedilen gönderi' ilişkisini siler.
     * @param {string} userId - Kullanıcının ID'si.
     * @param {number} postId - Gönderinin ID'si.
     * @returns {Promise<boolean>} Silme başarılıysa true, kayıt bulunamazsa false döner.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async deleteSaved(userId, postId) {
        const saved = await Saved.findOne({ where: { userId, postId } });
        if (saved) {
            await saved.destroy();
            return true; // Başarıyla silindi
        }
        return false; // Silinecek kayıt bulunamadı
    },

    /**
     * Kullanıcı ve gönderi ID'sine göre 'kaydedilen' kaydını bulur.
     * @param {string} userId - Kullanıcının ID'si.
     * @param {number} postId - Gönderinin ID'si.
     * @returns {Promise<Saved|null>} Bulunan Saved modeli örneği veya null.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findSavedByUserAndPost(userId, postId) {
        return await Saved.findOne({ where: { userId, postId } });
    },

    /**
     * Bir kullanıcının kaydettiği tüm gönderileri (detaylarıyla birlikte) bulur.
     * @param {string} userId - Kullanıcının ID'si.
     * @returns {Promise<Array<Saved>>} Kullanıcının kaydettiği gönderileri içeren Saved örnekleri dizisi (ilişkili Post ve User bilgileriyle).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findAllSavedPostsByUser(userId) {
        return await Saved.findAll({
            where: { userId },
            include: [{ model: Post, include: [User] }],
            order: [["createdAt", "DESC"]],
        });
    },

    /**
     * Bir kullanıcının kaydettiği tüm gönderilerin ID'lerini bulur.
     * @param {string} userId - Kullanıcının ID'si.
     * @returns {Promise<Array<number>>} Kullanıcının kaydettiği gönderi ID'leri dizisi.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findAllSavedPostIdsByUser(userId) {
        const saveds = await Saved.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
            attributes: ["postId"],
        });

        // Bulunan kayıtlardan sadece postId'leri alıp bir diziye dönüştür
        return saveds ? saveds.map((saved) => saved.postId) : [];
    },
};

export default savedRepository;
