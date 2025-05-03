/**
 * @fileoverview Arama işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/searchController
 */

import diContainer from "../config/dependencyInjection.js";
import logger from "../utils/logger.js";

const { searchService } = diContainer;

/**
 * @description Arama işlemleri (kullanıcı ve gönderi) için controller fonksiyonlarını içerir.
 */
const searchController = {
    /**
     * @description Kullanıcıları arama sorgusuna göre listeler.
     * @route GET /search/users?query={searchTerm}
     * @param {object} req - Express istek nesnesi. `req.query.query` arama terimini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    searchUsers: async (req, res, next) => {
        // next eklendi (hata yönetimi için)
        try {
            logger.info("Searching users...");
            // Hata yönetimi eklendi
            const { query } = req.query;
            // Servis fonksiyonu çağrılır
            const users = await searchService.searchUsers(query);

            logger.info("Users searched successfully");

            // Başarılı yanıt (boş dizi de olabilir)
            res.status(200).json(users);
        } catch (error) {
            logger.error("Error searching users:", error);
            next(error); // Hata yönetimi middleware'ine devret
        }
    },

    /**
     * @description Gönderileri arama sorgusuna göre listeler. Aktif kullanıcının ID'si de gönderilir (örn: beğenme/kaydetme durumunu kontrol etmek için).
     * @route GET /search/posts?query={searchTerm}
     * @param {object} req - Express istek nesnesi. `req.query.query` arama terimini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    searchPosts: async (req, res, next) => {
        // next eklendi
        try {
            logger.info("Searching posts...");
            // Hata yönetimi eklendi
            const { query } = req.query;
            const userId = req.user.uid; // Kimlik doğrulamadan gelen kullanıcı ID'si

            // Servis fonksiyonu çağrılır
            const posts = await searchService.searchPosts(query, userId);

            logger.info("Posts searched successfully");

            // Başarılı yanıt (boş dizi de olabilir)
            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error searching posts:", error);
            next(error); // Hata yönetimi middleware'ine devret
        }
    },
};

export default searchController;
