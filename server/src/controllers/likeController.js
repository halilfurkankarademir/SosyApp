// begeni islemleri icin controllerlar
import likeService from "../services/likeService.js";

const likeController = {
    createLike: async (req, res) => {
        try {
            //Kullanicinin begenecigi postun idsini aliyoruz
            const { postId } = req.params;
            // Kullanıcının kimliği JWT'den alınıyor
            const userId = req.user.uid;
            const like = await likeService.createLike(userId, postId);
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
            const likes = await likeService.getAllLikes(postId);
            res.status(200).json(likes);
        } catch (error) {
            console.error("Error getting likes:", error);
            res.status(500).json({
                error: "Begenileri alırken bir hata oluştu.",
            });
        }
    },

    checkLike: async (req, res) => {
        try {
            const { postId } = req.params;
            const userId = req.user.uid;
            const isLiked = await likeService.checkLike(userId, postId);
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
