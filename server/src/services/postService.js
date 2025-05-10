import { Op } from "@sequelize/core";
import { addPostDetailsForUser } from "../utils/helpers.js";
import { ErrorMessages } from "../utils/constants.js";
import createHttpError from "http-errors";

/**
 * Gönderi işlemleri için servis katmanı.
 */

const postService = (
    likeRepository,
    postRepository,
    savedRepository,
    followService
) => ({
    /**
     * Verilen verilerle yeni bir gönderi oluşturur.
     * @param {object} postData - Oluşturulacak gönderinin verileri (örn: userId, content).
     * @returns {Promise<Post>} Oluşturulan yeni gönderi nesnesi.
     */
    createPost: async (postData) => {
        try {
            const newPost = await postRepository.create(postData);
            if (!newPost) {
                throw createHttpError(500, "Failed to create post");
            }
            return newPost;
        } catch (error) {
            throw createHttpError(500, "Failed to create post");
        }
    },

    /**
     * Belirtilen ID'ye sahip gönderiyi siler.
     * @param {number} postId - Silinecek gönderinin ID'si.
     * @returns {Promise<void>} Başarılı olursa bir şey döndürmez.
     */
    deletePost: async (postId) => {
        try {
            await postRepository.deleteById(postId);
        } catch (error) {
            throw createHttpError(500, "Failed to delete post");
        }
    },

    /**
     * Kullanıcının takip ettiği kişilerin ve kendisinin gönderilerini sayfalanmış olarak getirir (Feed).
     * @param {string} userId - Akışı görüntülenecek kullanıcının ID'si.
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @param {number} offset - Atlanacak gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının akışındaki gönderileri ve toplam gönderi sayısını içeren nesne.
     */
    getFeedPosts: async (userId, limit, offset) => {
        try {
            const followingUsersIds = await followService.getFollowingUsersId(
                userId
            );

            // Takip edilen kimse yoksa sadece kendi postlarını getirecek filtre oluşturulur.
            const filterConditions = [{ userId: userId }];
            if (followingUsersIds && followingUsersIds.length > 0) {
                filterConditions.push({
                    userId: { [Op.in]: followingUsersIds },
                });
            }

            const postsFilter = {
                [Op.or]: filterConditions,
            };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts || posts.length === 0) {
                return { posts: [], count: 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get feed posts");
        }
    },

    /**
     * Trending postlarını sayfalanmış olarak getirir.
     * @param {string} userId - Trending gönderileri gösterilecek kullanıcının ID'si.
     * @param {number} offset - Atlanacak gönderi sayısı.
     * @param {number} limit - Sayfa basina gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Trending gönderileri ve toplam gönderi sayısını içeren nesne.
     */
    getTrendingPosts: async (userId, offset, limit) => {
        try {
            // Kullanicinin kendi gonderilerini gormesini engellemek icin
            const postFilters = { userId: { [Op.ne]: userId } };

            const { rows: posts, count } =
                await postRepository.findTrendingPosts({
                    where: postFilters,
                    offset,
                    limit,
                });

            if (!posts) {
                return [];
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get trending posts");
        }
    },

    /**
     * Belirtilen ID'ye sahip gönderiyi getirir.
     * @param {number} postId - Getirilecek gönderinin ID'si.
     * @returns {Promise<Post|null>} Bulunan gönderi nesnesini veya bulunamazsa null döndürür.
     */
    getPostById: async (postId) => {
        try {
            const post = await postRepository.findById(postId);

            if (!post) {
                throw createHttpError(404, "Post not found.");
            }

            const updatedPost = addPostDetailsForUser(post, post.userId);

            return updatedPost;
        } catch (error) {
            throw createHttpError(500, "Failed to get post by ID.");
        }
    },

    /**
     * Belirli bir kullanıcının beğendiği gönderileri sayfalanmış olarak getirir.
     * @param {string} userId - Beğenilen gönderileri getirilecek kullanıcının ID'si.
     * @param {number} page - Getirilecek sayfa numarası (1'den başlar).
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının beğendiği gönderileri ve toplam sayıyı içeren nesne.
     */
    getLikedPostsByUserId: async (userId, offset, limit, filter) => {
        try {
            if (!userId) {
                throw createHttpError(401, ErrorMessages.USERS_NOT_FOUND);
            }

            const postIds = await likeRepository.findLikedPostIdsByUserId(
                userId
            );

            if (!postIds || postIds.length === 0) {
                return { posts: [], count: 0 };
            }

            const postsFilter = {
                id: { [Op.in]: postIds },
                content: { [Op.iLike]: `%${filter}%` },
            };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts || posts.length === 0) {
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get liked posts by user ID.");
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği gönderileri sayfalanmış olarak getirir.
     * @param {string} userId - Kaydedilmiş gönderileri getirilecek kullanıcının ID'si.
     * @param {number} offset - Atlanacak gönderi sayısı.
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @param {string} filters - Filtreleme yapılacak metin.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının kaydettiği gönderileri ve toplam sayıyı içeren nesne.
     */
    getSavedPostsByUserId: async (userId, offset, limit, filters) => {
        try {
            const postIds = await savedRepository.findAllSavedPostIdsByUser(
                userId
            );

            if (!postIds || postIds.length === 0) {
                return { posts: [], count: 0 };
            }

            const postsFilter = {
                id: { [Op.in]: postIds },
                content: { [Op.iLike]: `%${filters}%` },
            };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts || posts.length === 0) {
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get saved posts by user ID.");
        }
    },

    /**
     * Belirli bir kullanıcıya ait gönderileri sayfalanmış olarak getirir.
     * @param {string} userId - Gönderileri getirilecek kullanıcının ID'si.
     * @param {number} offset - Atlanacak gönderi sayısı.
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının gönderilerini ve toplam gönderi sayısını içeren nesne.
     */
    getPostsByUserId: async (userId, offset, limit, requestedUserId) => {
        try {
            const postsFilter = { userId: userId };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts || posts.length === 0) {
                return { posts: [], count: 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, requestedUserId);

            return { posts: updatedPosts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get posts by user ID.");
        }
    },
});

export default postService;
