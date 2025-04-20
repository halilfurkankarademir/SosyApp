// takip islemleri icin controllerlar
import followService from "../services/followService.js";

const followController = {
    // FollowerId takip eden kullanıcı idsi, FollowingId takip edilen kullanıcı idsi
    async createFollow(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;
        const follower = await followService.followUser(followerId, userId);
        res.json(follower);
    },
    async deleteFollow(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;
        const follower = await followService.unfollowUser(followerId, userId);
        res.json(follower);
    },

    async checkFollow(req, res) {
        const followerId = req.user.uid;
        const followingId = req.params.followingUserId;
        const isFollowing = await followService.checkIsFollowing(
            followerId,
            followingId
        );
        res.json(isFollowing);
    },

    async getAuthenticatedUserFollowers(req, res) {
        const userId = req.user.uid;
        const followers = await followService.getFollowers(userId);
        res.json(followers);
    },

    async getAuthenticatedUserFollowing(req, res) {
        const userId = req.user.uid;
        const following = await followService.getFollowing(userId);
        res.json(following);
    },

    async getFollowersById(req, res) {
        const followingId = req.params.followingUserId;
        const followers = await followService.getFollowersById(followingId);
        res.json(followers);
    },

    async getFollowingById(req, res) {
        const followingId = req.params.followingUserId;
        const following = await followService.getFollowingById(followingId);
        res.json(following);
    },
};

export default followController;
