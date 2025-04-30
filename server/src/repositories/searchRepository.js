/**
 * @fileoverview Arama işlemleri için veritabanı sorgularını yönetir.
 * @module repositories/searchRepository
 */

import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";
import logger from "../utils/logger.js";

export default {
    /**
     * Kullanıcıları kullanıcı adı, isim veya soyisime göre arar.
     * @param {string} query - Arama yapılacak metin.
     * @returns {Promise<Array<User>>} Eşleşen kullanıcıların listesi (belirli alanlarla).
     * @throws {Error} Veritabanı sorgusu sırasında hata oluşursa.
     */
    async searchUsers(query) {
        try {
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.iLike]: `%${query}%`, // Case-insensitive like
                            },
                        },
                        {
                            firstName: {
                                [Op.iLike]: `%${query}%`,
                            },
                        },
                        {
                            lastName: {
                                [Op.iLike]: `%${query}%`,
                            },
                        },
                    ],
                },
                attributes: [
                    "uid",
                    "username",
                    "firstName",
                    "lastName",
                    "profilePicture",
                ],
            });

            return users;
        } catch (error) {
            logger.error("Error searching users:", error);
            throw new Error("Error searching for users in repository");
        }
    },

    /**
     * Gönderileri içeriklerine göre arar.
     * @param {string} query - Arama yapılacak metin.
     * @returns {Promise<Array<Post>>} Eşleşen gönderilerin listesi (kullanıcı bilgileriyle birlikte).
     * @throws {Error} Veritabanı sorgusu sırasında hata oluşursa.
     */
    async searchPosts(query) {
        try {
            const posts = await Post.findAll({
                where: {
                    content: {
                        [Op.iLike]: `%${query}%`,
                    },
                },
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
                order: [["createdAt", "DESC"]],
            });
            return posts;
        } catch (error) {
            logger.error("Error searching posts:", error);
            throw new Error("Error searching for posts in repository");
        }
    },
};
