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

    // async getAllFollowers(followingId) {
    //     return Follow.findAll({ where: { followingId } });
    // },

    // async getAllFollowings(followerId) {
    //     return Follow.findAll({ where: { followerId } });
    // },

    // async getFollowerCount(followingId) {
    //     return Follow.count({ where: { followingId } });
    // },

    // async getFollowingCount(followerId) {
    //     return Follow.count({ where: { followerId } });
    // },
};

export default followService;
