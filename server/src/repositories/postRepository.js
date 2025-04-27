import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import Saved from "../models/savedModel.js";
import User from "../models/userModel.js";

const standartIncludes = [
    {
        model: User,
        as: "user",
        attributes: [
            "uid",
            "username",
            "profilePicture",
            "firstName",
            "lastName",
        ],
    },
    { model: Like, attributes: ["userId"] },
    { model: Saved, attributes: ["userId"] },
    {
        model: Comment,
        include: [
            {
                model: User,
                as: "user",
                attributes: [
                    "uid",
                    "username",
                    "profilePicture",
                    "firstName",
                    "lastName",
                ],
            },
        ],
        order: [["createdAt", "ASC"]],
        required: false,
    },
];

export default {
    async create(postData) {
        try {
            return await Post.create(postData);
        } catch (error) {
            console.error("Repository create error:", error);
            throw new Error(`Gönderi oluşturulamadı.`);
        }
    },

    async deleteById(postId) {
        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                throw new Error("Gönderi bulunamadı");
            }
            await post.destroy();
            return { success: true };
        } catch (error) {
            console.error("Repository delete error:", error);
            throw new Error(`Gönderi silinemedi: ${error.message}`);
        }
    },

    // Tüm gönderi bulma işlemleri için ana fonksiyon
    async findPosts(options = {}) {
        try {
            return await Post.findAndCountAll({
                include: standartIncludes,
                order: [["createdAt", "DESC"]],
                ...options, // Gelen filtre (where), limit, offset'i uygula
                distinct: true,
            });
        } catch (error) {
            console.error("Repository findPosts error:", error);
            throw new Error(`Gönderiler getirilemedi.`);
        }
    },

    async findById(postId) {
        try {
            // findPosts'u kullanmıyoruz çünkü findByPk daha basit ve count'a gerek yok
            const post = await Post.findByPk(postId, {
                include: standartIncludes, // Tek gönderi için de ilişkileri getir
            });
            return post; // Bulamazsa null döner
        } catch (error) {
            console.error("Repository findById error:", error);
            throw new Error(`Gönderi getirilemedi.`);
        }
    },
};
