/**
 * Arama işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import logger from "../utils/logger.js";

const { searchService } = diContainer;

/**
 *  Arama işlemleri (kullanıcı ve gönderi) için controller fonksiyonlarını içerir.
 */
const searchController = {
    /**
     * Kullanıcıları arama sorgusuna göre listeler.
     */
    searchUsers: async (req, res, next) => {
        try {
            logger.info("Searching users...");

            const { query } = req.query;

            const users = await searchService.searchUsers(query);

            logger.info("Users searched successfully");

            res.status(200).json(users);
        } catch (error) {
            logger.error("Error searching users:", error);
            next(error);
        }
    },

    /**
     * Gönderileri arama sorgusuna göre listeler. Aktif kullanıcının ID'si de gönderilir (örn: beğenme/kaydetme durumunu kontrol etmek için).
     */
    searchPosts: async (req, res, next) => {
        try {
            logger.info("Searching posts...");

            const { query } = req.query;
            const userId = req.user.uid;

            const posts = await searchService.searchPosts(query, userId);

            logger.info("Posts searched successfully");

            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error searching posts:", error);
            next(error);
        }
    },
};

export default searchController;
