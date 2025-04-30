import { Op } from "@sequelize/core";
import likeRepository from "../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";
import logger from "../utils/logger.js";
import savedRepository from "../repositories/savedRepository.js";
import followService from "./followService.js";
import { addPostDetailsForUser } from "../utils/helpers.js";

/**
 * Gönderi işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace postService
 */

const PostService = {
    /**
     * Verilen verilerle yeni bir gönderi oluşturur.
     * @memberof postService
     * @param {object} postData - Oluşturulacak gönderinin verileri (örn: userId, content).
     * @returns {Promise<Post>} Oluşturulan yeni gönderi nesnesi.
     * @throws {Error} Gönderi oluşturma sırasında bir hata oluşursa.
     */
    createPost: async (postData) => {
        try {
            logger.info("Creating post with data:", postData);
            const newPost = await postRepository.create(postData);
            if (!newPost) {
                throw new Error("Post creation failed");
            }
            return newPost;
        } catch (error) {
            logger.error("Error creating post:", error);
            throw new Error("Error creating post");
        }
    },

    /**
     * Belirtilen ID'ye sahip gönderiyi siler.
     * @memberof postService
     * @param {number} postId - Silinecek gönderinin ID'si.
     * @returns {Promise<void>} Başarılı olursa bir şey döndürmez.
     * @throws {Error} Gönderi silme sırasında bir hata oluşursa.
     */
    deletePost: async (postId) => {
        try {
            logger.info("Deleting post with ID:", postId);
            await postRepository.deleteById(postId);
        } catch (error) {
            logger.error("Error deleting post:", error);
            throw new Error("Error deleting post");
        }
    },

    /**
     * Kullanıcının takip ettiği kişilerin ve kendisinin gönderilerini sayfalanmış olarak getirir (Feed).
     * @memberof postService
     * @param {string} userId - Akışı görüntülenecek kullanıcının ID'si.
     * @param {number} page - Getirilecek sayfa numarası (1'den başlar).
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının akışındaki gönderileri ve toplam gönderi sayısını içeren nesne.
     * @throws {Error} Akış gönderilerini getirme sırasında bir hata oluşursa.
     */
    getFeedPosts: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

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
                // Sıralama eklemek genellikle feed için önemlidir, örn: order: [['createdAt', 'DESC']]
            });

            // Hata fırlatmak yerine boş sonuç dönmek daha iyi olabilir.
            if (!posts || posts.length === 0) {
                return { posts: [], count: 0 };
                // throw new Error("No posts found for this user's feed");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching feed posts:", error);
            throw new Error("Error getting feed posts");
        }
    },

    /**
     * Belirtilen ID'ye sahip gönderiyi getirir.
     * @memberof postService
     * @param {number} postId - Getirilecek gönderinin ID'si.
     * @returns {Promise<Post|null>} Bulunan gönderi nesnesini veya bulunamazsa null döndürür.
     */
    getPostById: (postId) => {
        // Repository'nin Promise döndürdüğünü varsayıyoruz.
        return postRepository.findById(postId);
    },

    /**
     * Belirli bir kullanıcının beğendiği gönderileri sayfalanmış olarak getirir.
     * @memberof postService
     * @param {string} userId - Beğenilen gönderileri getirilecek kullanıcının ID'si.
     * @param {number} page - Getirilecek sayfa numarası (1'den başlar).
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının beğendiği gönderileri ve toplam sayıyı içeren nesne.
     * @throws {Error} Beğenilen gönderileri getirme sırasında bir hata oluşursa.
     */
    getLikedPostsByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const postIds = await likeRepository.findLikedPostIdsByUserId(
                userId
            );
            logger.info("Fetched liked post IDs by user ID:", userId);

            // Beğenilen post yoksa boş sonuç dön.
            if (!postIds || postIds.length === 0) {
                return { posts: [], count: 0 };
                // throw new Error("No liked posts found for this user");
            }

            const postsFilter = { id: { [Op.in]: postIds } };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            // Postlar bulunamasa bile (silinmiş olabilirler) boş dön.
            if (!posts || posts.length === 0) {
                // count, bulunan post sayısı değil, toplam eşleşen ID sayısı olabilir.
                // Bu durumda bulunan postları ve repository'den gelen count'u dönmek daha doğru.
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching liked posts by user ID:", error);
            throw new Error("Error getting liked posts by user ID");
        }
    },

    /**
     * Belirli bir kullanıcının kaydettiği gönderileri sayfalanmış olarak getirir.
     * @memberof postService
     * @param {string} userId - Kaydedilmiş gönderileri getirilecek kullanıcının ID'si.
     * @param {number} page - Getirilecek sayfa numarası (1'den başlar).
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının kaydettiği gönderileri ve toplam sayıyı içeren nesne.
     * @throws {Error} Kaydedilmiş gönderileri getirme sırasında bir hata oluşursa.
     */
    getSavedPostsByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const postIds = await savedRepository.findAllSavedPostIdsByUser(
                userId
            );
            logger.info("Fetched saved post IDs by user ID:", userId);

            // Kaydedilmiş post yoksa boş sonuç dön.
            if (!postIds || postIds.length === 0) {
                return { posts: [], count: 0 };
                // throw new Error("No saved posts found for this user");
            }

            const postsFilter = { id: { [Op.in]: postIds } };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            // Postlar bulunamasa bile (silinmiş olabilirler) boş dön.
            if (!posts || posts.length === 0) {
                return { posts: [], count: count || 0 };
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching saved posts by user ID:", error);
            throw new Error("Error getting saved posts by user ID");
        }
    },

    /**
     * Belirli bir kullanıcıya ait gönderileri sayfalanmış olarak getirir.
     * @memberof postService
     * @param {string} userId - Gönderileri getirilecek kullanıcının ID'si.
     * @param {number} page - Getirilecek sayfa numarası (1'den başlar).
     * @param {number} limit - Sayfa başına gönderi sayısı.
     * @returns {Promise<{posts: Array<Post>, count: number}>} Kullanıcının gönderilerini ve toplam gönderi sayısını içeren nesne.
     * @throws {Error} Gönderileri getirme sırasında bir hata oluşursa.
     */
    getPostsByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const postsFilter = { userId: userId };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
                // order: [['createdAt', 'DESC']] // Kullanıcının postlarını sıralamak iyi olabilir
            });
            logger.info("Fetched posts by user ID:", userId);

            // Hata fırlatmak yerine boş sonuç dönmek daha iyi olabilir.
            if (!posts || posts.length === 0) {
                return { posts: [], count: 0 };
                // throw new Error("No posts found for this user");
            }

            // İsteği yapan kullanıcı ile post sahibi aynıysa userId tekrar göndermek gereksiz olabilir,
            // ama addPostDetailsForUser genel bir yardımcıysa sorun yok.
            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching posts by user ID:", error);
            throw new Error("Error getting posts by user ID");
        }
    },
};

export default PostService;
