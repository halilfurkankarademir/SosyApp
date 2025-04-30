import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

export default {
    async searchUsers(query) {
        try {
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.iLike]: `%${query}%`,
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
            console.error("Error searching users:", error);
            throw new Error("Error searching for users");
        }
    },

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
            console.log("Error searching:", error);
            throw new Error("Error searching");
        }
    },
};
