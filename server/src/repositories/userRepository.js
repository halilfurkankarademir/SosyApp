import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const standartIncludes = [
    {
        model: Post,
        attributes: ["id"],
    },
    {
        model: User,
        as: "Following",
        attributes: ["uid"],
    },
    {
        model: User,
        as: "Followers",
        attributes: ["uid"],
    },
];

export default {
    async findUser(options = {}) {
        try {
            return await User.findOne({
                ...options,
                include: standartIncludes,
            });
        } catch (error) {
            console.log("Error finding user:", error);
        }
    },
    async create(userData) {
        return User.create(userData);
    },

    async update(userId, updates) {
        const [affectedCount] = await User.update(updates, {
            where: { id: userId },
        });
        return affectedCount > 0;
    },

    async delete(userId) {
        return User.destroy({ where: { uid: userId } });
    },

    async getAll(options = {}) {
        return User.findAll({
            limit: options.limit || 10,
            offset: options.offset || 0,
        });
    },
};
