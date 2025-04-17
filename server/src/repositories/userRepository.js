import User from "../models/userModel.js";

export default {
    async getByUserId(userId) {
        try {
            return await User.findOne({ where: { uid: userId } });
        } catch (error) {
            throw new Error(`User fetch failed: ${error.message}`);
        }
    },

    async getByEmail(email) {
        return User.findOne({ where: { email } });
    },

    async getByUsername(username) {
        return User.findOne({ where: { username } });
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
        return User.destroy({ where: { id: userId } });
    },

    async getAll(options = {}) {
        return User.findAll({
            limit: options.limit || 10,
            offset: options.offset || 0,
        });
    },
};
