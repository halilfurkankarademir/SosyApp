import Follow from "../models/followModel.js";
import User from "../models/userModel.js";

const followService = {
    async followUser(followerId, followingId) {
        return Follow.create({ followerId, followingId });
    },

    async unfollowUser(followerId, followingId) {
        return Follow.destroy({ where: { followerId, followingId } });
    },

    async removeFollower(followerId, followingId) {
        return Follow.destroy({ where: { followerId, followingId } });
    },

    async checkIsFollowing(followerId, followingId) {
        return Follow.findOne({ where: { followerId, followingId } });
    },

    async getFollowers(followingId) {
        return Follow.findAll({
            where: { followingId },
            include: [
                {
                    association: "FollowerUser",
                },
            ],
        });
    },

    async getFollowing(followerId) {
        return Follow.findAll({
            where: { followerId },
            include: [
                {
                    association: "FollowedUser",
                },
            ],
        });
    },

    async getFollowersById(followingId) {
        return Follow.findAll({
            where: { followingId },
            include: [
                {
                    association: "FollowerUser",
                },
            ],
        });
    },

    async getFollowingById(followerId) {
        return Follow.findAll({
            where: { followerId },
            include: [
                {
                    association: "FollowedUser",
                },
            ],
        });
    },

    async getFollowingUsersId(followerId) {
        const followingUsers = await Follow.findAll({ where: { followerId } });

        const userIds = followingUsers.map((follow) => follow.followingId);
        return userIds;
    },
};

export default followService;
