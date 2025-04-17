import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export default {
    async create(postData) {
        try {
            return await Post.create(postData);
        } catch (error) {
            throw new Error(`Post creation failed: ${error.message}`);
        }
    },
    async delete(postId) {
        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            await post.destroy();
            return { success: true };
        } catch (error) {
            throw new Error(`Post deletion failed: ${error.message}`);
        }
    },

    async getAll() {
        try {
            const posts = await Post.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: [
                            "uid",
                            "username",
                            "profilePicture",
                            "firstName",
                            "lastName",
                        ],
                    },
                ],
            });
            return posts;
        } catch (error) {
            throw new Error(`Post fetch failed: ${error.message}`);
        }
    },

    async getById(postId) {
        try {
            return await Post.findByPk(postId);
        } catch (error) {
            throw new Error(`Post fetch failed: ${error.message}`);
        }
    },

    async getPostByUserId(userId) {
        try {
            return await Post.findAll({
                where: { userId },
                order: [["createdAt", "DESC"]],
            });
        } catch (error) {
            throw new Error(`Post fetch failed: ${error.message}`);
        }
    },
};
