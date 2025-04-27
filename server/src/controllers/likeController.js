// begeni islemleri icin controllerlar
import postRepository from "../repositories/postRepository.js";
import likeService from "../services/likeService.js";
import { sendLikeNotification } from "../services/notificationService.js";
import PostService from "../services/postService.js";

const likeController = {
    createLike: async (req, res) => {
        try {
            //Kullanicinin begenecigi postun idsini aliyoruz
            const { postId } = req.params;
            // Kullanıcının kimliği JWT'den alınıyor
            const userId = req.user.uid;

            const like = await likeService.createLike(userId, postId);

            console.log("Like created:", like);

            const post = await postRepository.findById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            sendLikeNotification(req.user, post.userId, postId);

            res.status(201).json(like);
        } catch (error) {
            console.error("Error creating like:", error);
            res.status(500).json({
                error: "Like oluşturulurken bir hata oluştu.",
            });
        }
    },
    deleteLike: async (req, res) => {
        try {
            const { postId } = req.params;
            const userId = req.user.uid; // Kullanıcının kimliği JWT'den alınıyor
            await likeService.deleteLike(userId, postId);
            res.status(200).json({ message: "Begeni iptal edildi." });
        } catch (error) {
            console.error("Error deleting like:", error);
            res.status(500).json({
                error: "Begeni iptal edilirken bir hata oluştu.",
            });
        }
    },

    getAllLikes: async (req, res) => {
        try {
            const postId = req.params.postId;
            const likes = await likeService.getLikesForPost(postId);
            res.status(200).json(likes);
        } catch (error) {
            console.error("Error getting likes:", error);
            res.status(500).json({
                error: "Begenileri alırken bir hata oluştu.",
            });
        }
    },

    getLikesByUserId: async (req, res) => {
        try {
            const userId = req.user.uid;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const likes = await PostService.getLikedPostsByUserId(
                userId,
                page,
                limit
            );
            res.status(200).json(likes);
        } catch (error) {
            console.error("Error getting likes by user ID:", error);
            res.status(500).json({
                error: "Kullanıcının begenilerini alırken bir hata oluştu.",
            });
        }
    },

    checkLike: async (req, res) => {
        try {
            const { postId } = req.params;
            const userId = req.user.uid;
            const isLiked = await likeService.hasUserLikedPost(userId, postId);
            res.status(200).json({ isLiked });
        } catch (error) {
            console.error("Error checking like:", error);
            res.status(500).json({
                error: "Begeni kontrol edilirken bir hata oluştu.",
            });
        }
    },
};
export default likeController;
