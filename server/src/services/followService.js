import Follow from "../models/followModel.js";

const followService = {
    async followUser(followerId, followingId) {
        return Follow.create({ followerId, followingId });
    },

    async unfollowUser(followerId, followingId) {
        return Follow.destroy({ where: { followerId, followingId } });
    },

    async checkIsFollowing(followerId, followingId) {
        return Follow.findOne({ where: { followerId, followingId } });
    },
};

export default followService;
