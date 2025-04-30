/**
 * @fileoverview Arama işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/searchController
 */

import searchService from "../services/searchService.js";

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
            // Hata yönetimi eklendi
            const { query } = req.query;
            // Servis fonksiyonu çağrılır
            const users = await searchService.searchUsers(query);

            // Başarılı yanıt (boş dizi de olabilir)
            res.status(200).json(users);
        } catch (error) {
            console.error("Error searching users:", error);
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
            // Hata yönetimi eklendi
            const { query } = req.query;
            const userId = req.user.uid; // Kimlik doğrulamadan gelen kullanıcı ID'si

            // Servis fonksiyonu çağrılır
            const posts = await searchService.searchPosts(query, userId);

            // Başarılı yanıt (boş dizi de olabilir)
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error searching posts:", error);
            next(error); // Hata yönetimi middleware'ine devret
        }
    },
};

export default searchController;
