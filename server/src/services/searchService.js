import postRepository from "../repositories/postRepository.js";
import searchRepository from "../repositories/searchRepository.js";
import { Op } from "sequelize";
import { addPostDetailsForUser } from "../utils/helpers.js";
import { ErrorMessages } from "../utils/constants.js";
import logger from "../utils/logger.js";

/**
 * Arama işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace searchService
 */

const searchService = {
    /**
     * Kullanıcıları verilen sorgu metnine göre arar.
     * @memberof searchService
     * @param {string} query - Aranacak metin.
     * @returns {Promise<Array<object>>} Bulunan kullanıcı nesnelerinin dizisi (array).
     * @throws {Error} Kullanıcı araması sırasında bir hata oluşursa.
     */
    searchUsers: async (query) => {
        try {
            logger.info("Searching users...");
            if (!query || query.trim() === "") {
                logger.info("No query provided.");
                return [];
            }

            const users = await searchRepository.searchUsers(query);

            if (!users || users.length === 0) {
                logger.info("No users found for the query:", query);
                return [];
            }

            return users;
        } catch (error) {
            logger.error("Error searching users:", error);
            throw new Error(ErrorMessages.USER_SEARCH_ERROR);
        }
    },

    /**
     * Gönderileri içeriklerine göre arar ve sonuçlara kullanıcıya özel detayları ekler.
     * @memberof searchService
     * @param {string} query - Gönderi içeriğinde aranacak metin.
     * @param {string | number | undefined} requestedUserId - İsteği yapan kullanıcının ID'si (isOwner, isLiked vb. için).
     * @returns {Promise<{posts: Array<object>, count: number}>} Güncellenmiş gönderileri ve toplam sayıyı içeren bir nesne.
     * @throws {Error} Gönderi araması sırasında bir hata oluşursa.
     */
    searchPosts: async (query, requestedUserId) => {
        try {
            const postFilters = {
                content: {
                    [Op.iLike]: `%${query}%`,
                },
            };
            const { rows: posts, count } = await postRepository.findPosts({
                where: postFilters,
            });

            if (!Array.isArray(posts) || posts.length === 0) {
                logger.info("No posts found for the query:", query);
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, requestedUserId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error searching posts:", error);
            throw new Error(ErrorMessages.POST_SEARCH_ERROR);
        }
    },
};

export default searchService;
