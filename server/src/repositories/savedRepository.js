import Saved from "../models/savedModel.js";

const savedRepository = {
    async createSaved(userId, postId) {
        return await Saved.create({ userId, postId });
    },

    async deleteSaved(userId, postId) {
        const saved = await Saved.findOne({ where: { userId, postId } });
        if (saved) {
            await saved.destroy();
            return true;
        }
        return false;
    },

    async findSavedByUserAndPost(userId, postId) {
        return await Saved.findOne({ where: { userId, postId } });
    },

    async findAllSavedPostsByUser(userId) {
        return await Saved.findAll({
            where: { userId },
            include: [{ model: Post, include: [User] }],
            order: [["createdAt", "DESC"]],
        });
    },

    async findAllSavedPostIdsByUser(userId) {
        const saveds = await Saved.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
            attributes: ["postId"],
        });

        return saveds ? saveds.map((saved) => saved.postId) : [];
    },
};

export default savedRepository;
