// takip islemleri icin controllerlar
import followService from "../services/followService.js";

const followController = {
    // async getAuthenticatedUserFollowers(req, res) {
    //     const userId = req.user.uid;
    //     const followers = await followService.getAllFollowers(userId);
    //     res.json(followers);
    // },
    // async getAuthenticatedUserFollowing(req, res) {
    //     const userId = req.user.uid;
    //     const following = await followService.getAllFollowings(userId);
    //     res.json(following);
    // },
    async createFollow(req, res) {
        const { userId } = req.params;
        const follower = await followService.followUser(req.uid, userId);
        res.json(follower);
    },
    async deleteFollow(req, res) {
        const { userId } = req.params;
        const follower = await followService.unfollowUser(req.uid, userId);
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
};

export default followController;
