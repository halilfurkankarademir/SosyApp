/**
 * @fileoverview Gönderi (Post) veritabanı işlemlerini yönetir.
 * @module repositories/postRepository
 */

import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import Saved from "../models/savedModel.js";
import User from "../models/userModel.js";

/**
 * Gönderi sorgularında sık kullanılan ilişkileri içeren standart include dizisi.
 * User (yazar), Like'lar, Saved'ler ve Comment'leri (yorum yapan kullanıcıyla birlikte) içerir.
 */
const standartIncludes = [
    {
        model: User,
        as: "user",
        attributes: [
            "uid",
            "username",
            "profilePicture",
            "firstName",
            "lastName",
        ],
    },
    { model: Like, attributes: ["userId"] },
    { model: Saved, attributes: ["userId"] },
    {
        model: Comment,
        include: [
            {
                model: User,
                as: "user",
                attributes: [
                    "uid",
                    "username",
                    "profilePicture",
                    "firstName",
                    "lastName",
                ],
            },
        ],
        order: [["createdAt", "ASC"]],
        required: false, // Yorum olmasa bile gönderiyi getir
    },
];

export default {
    /**
     * Yeni bir gönderi oluşturur.
     * @param {object} postData - Oluşturulacak gönderinin verileri (örn: { content, userId, imageUrl }).
     * @returns {Promise<Post>} Oluşturulan Post modeli örneği.
     * @throws {Error} Veritabanı hatası veya validasyon hatası durumunda.
     */
    async create(postData) {
        try {
            return await Post.create(postData);
        } catch (error) {
            console.error("Repository create post error:", error);
            throw new Error(`Gönderi oluşturulamadı.`); // Servis katmanı daha anlamlı hata verebilir
        }
    },

    /**
     * Belirli bir gönderiyi ID'sine göre siler.
     * @param {number} postId - Silinecek gönderinin ID'si.
     * @returns {Promise<{success: true}>} Silme başarılıysa.
     * @throws {Error} Gönderi bulunamazsa veya veritabanı hatası olursa.
     */
    async deleteById(postId) {
        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                // Bu hatayı servis katmanında yakalamak daha uygun olabilir (404 Not Found)
                throw new Error("Gönderi bulunamadı");
            }
            await post.destroy();
            return { success: true };
        } catch (error) {
            console.error("Repository delete post error:", error);
            // Hata mesajını koruyarak tekrar fırlat
            throw new Error(`Gönderi silinemedi: ${error.message}`);
        }
    },

    /**
     * Gönderileri filtreleme, sayfalama ve ilişkilendirme seçenekleriyle bulur.
     * @param {object} [options={}] - Sequelize `findAndCountAll` metoduna geçilecek ek seçenekler (örn: where, limit, offset).
     * @returns {Promise<{count: number, rows: Array<Post>}>} Bulunan gönderilerin sayısı ve listesi (ilişkili verilerle).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findPosts(options = {}) {
        try {
            return await Post.findAndCountAll({
                include: standartIncludes,
                order: [["createdAt", "DESC"]],
                ...options, // Gelen where, limit, offset vb. uygula
                distinct: true, // Count'un doğru çalışması için (özellikle many-to-many ilişkilerde)
            });
        } catch (error) {
            console.error("Repository findPosts error:", error);
            throw new Error(`Gönderiler getirilemedi.`);
        }
    },

    /**
     * Belirli bir gönderiyi ID'sine göre ilişkili verileriyle birlikte bulur.
     * @param {number} postId - Bulunacak gönderinin ID'si.
     * @returns {Promise<Post|null>} Bulunan Post modeli örneği (ilişkili verilerle) veya bulunamazsa null.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findById(postId) {
        try {
            const post = await Post.findByPk(postId, {
                include: standartIncludes,
            });
            return post;
        } catch (error) {
            console.error("Repository findById post error:", error);
            throw new Error(`Gönderi getirilemedi.`);
        }
    },
};
