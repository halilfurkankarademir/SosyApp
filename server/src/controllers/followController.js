/**
 * @fileoverview Takip etme/edilmeyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/followController
 */

// takip islemleri icin controllerlar
import followService from "../services/followService.js";
import { sendFollowNotification } from "../services/notificationService.js";
import UserService from "../services/userService.js";

/**
 * @description Takip etme/çıkarma, takipçi/takip edilen listeleme ve kontrol işlemleri için controller fonksiyonlarını içerir.
 */
const followController = {
    // FollowerId takip eden kullanıcı idsi, FollowingId takip edilen kullanıcı idsi

    /**
     * @description Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takip etmesini sağlar ve bildirim gönderir.
     * @route POST /follow/:userId
     * @param {object} req - Express istek nesnesi. `req.params.userId` takip edilecek kullanıcı ID'sini, `req.user.uid` takip eden kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async createFollow(req, res) {
        const followedUserId = req.params.userId;
        const followerId = req.user.uid;
        const follow = await followService.followUser(
            followerId,
            followedUserId
        );
        const followerUser = await UserService.getUserById(followerId, req.ip); // req.ip kullanımı? Gerekli mi?
        sendFollowNotification(followerUser, followedUserId);
        res.json(follow);
    },
    /**
     * @description Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takipten çıkmasını sağlar.
     * @route DELETE /follow/:userId
     * @param {object} req - Express istek nesnesi. `req.params.userId` takipten çıkarılacak kullanıcı ID'sini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async deleteFollow(req, res) {
        const { userId } = req.params;
        const followerId = req.user.uid;
        const follower = await followService.unfollowUser(followerId, userId);
        res.json(follower);
    },

    /**
     * @description Aktif kullanıcının, kendisini takip eden ve ID'si verilen bir kullanıcıyı takipçi listesinden çıkarmasını sağlar.
     * @route DELETE /follow/follower/:followerId
     * @param {object} req - Express istek nesnesi. `req.params.followerId` çıkarılacak takipçi ID'sini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async deleteFollower(req, res) {
        const followerId = req.params.followerId;
        const followingId = req.user.uid;
        const response = await followService.removeFollower(
            followerId,
            followingId
        );
        res.json(response);
    },

    /**
     * @description Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takip edip etmediğini kontrol eder.
     * @route GET /follow/check/:followingUserId
     * @param {object} req - Express istek nesnesi. `req.params.followingUserId` kontrol edilecek kullanıcı ID'sini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async checkFollow(req, res) {
        const followerId = req.user.uid;
        const followingId = req.params.followingUserId;
        const isFollowing = await followService.checkIsFollowing(
            followerId,
            followingId
        );
        res.json(isFollowing); // { isFollowing: true/false } gibi bir obje dönmek daha standart olabilir
    },

    /**
     * @description Oturum açmış aktif kullanıcının takipçilerini listeler.
     * @route GET /follow/followers
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getAuthenticatedUserFollowers(req, res) {
        const userId = req.user.uid;
        const followers = await followService.getFollowers(userId);
        res.json(followers);
    },

    /**
     * @description Oturum açmış aktif kullanıcının takip ettiği kişileri listeler.
     * @route GET /follow/following
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getAuthenticatedUserFollowing(req, res) {
        const userId = req.user.uid;
        const following = await followService.getFollowing(userId);
        res.json(following);
    },

    /**
     * @description ID'si verilen bir kullanıcının takipçilerini listeler.
     * @route GET /follow/followers/:followingUserId
     * @param {object} req - Express istek nesnesi. `req.params.followingUserId` takipçileri listelenecek kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getFollowersById(req, res) {
        const followingId = req.params.followingUserId;
        const followers = await followService.getFollowers(followingId);
        res.json(followers);
    },

    /**
     * @description ID'si verilen bir kullanıcının takip ettiği kişileri listeler. (Not: Kod aktif kullanıcıyı alıyor!)
     * @route GET /follow/following/:userId (?) (Kod aktif kullanıcıyı işliyor, route tanımını kontrol edin)
     * @param {object} req - Express istek nesnesi. (Kod `req.user.uid` kullanıyor).
     * @param {object} res - Express yanıt nesnesi.
     */
    async getFollowingById(req, res) {
        const followingId = req.user.uid; // Dikkat: Aktif kullanıcının ID'si alınıyor.
        const following = await followService.getFollowing(followingId);
        res.json(following);
    },
};

export default followController;
