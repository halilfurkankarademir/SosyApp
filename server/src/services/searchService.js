import { Op } from "sequelize";
import { addPostDetailsForUser } from "../utils/helpers.js";
import createHttpError from "http-errors";

/**
 * Arama işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 */

const searchService = (postRepository, searchRepository) => ({
    /**
     * Kullanıcıları verilen sorgu metnine göre arar.
     * @param {string} query - Aranacak metin.
     * @returns {Promise<Array<object>>} Bulunan kullanıcı nesnelerinin dizisi (array).
     */
    searchUsers: async (query) => {
        try {
            if (!query || query.trim() === "") {
                return [];
            }

            const users = await searchRepository.searchUsers(query);

            if (!users || users.length === 0) {
                return [];
            }

            return users;
        } catch (error) {
            throw createHttpError(500, "Failed to search users.");
        }
    },

    /**
     * Gönderileri içeriklerine göre arar ve sonuçlara kullanıcıya özel detayları ekler.
     * @param {string} query - Gönderi içeriğinde aranacak metin.
     * @param {string | number | undefined} requestedUserId - İsteği yapan kullanıcının ID'si (isOwner, isLiked vb. için).
     * @returns {Promise<{posts: Array<object>, count: number}>} Güncellenmiş gönderileri ve toplam sayıyı içeren bir nesne.
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
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, requestedUserId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to search posts.");
        }
    },
});

export default searchService;
