import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { Op } from "sequelize";

const searchService = {
    searchUsers: async (query) => {
        try {
            console.log("Searching users with query:", query); // Log the input query
            if (!query || query.trim() === "") {
                console.log("Query is empty, returning no users.");
                return [];
            }

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
            console.error("Error searching users:", error); // Log the full error
            throw new Error("Error searching for users");
        }
    },

    searchPosts: async (query) => {
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

export default searchService;
