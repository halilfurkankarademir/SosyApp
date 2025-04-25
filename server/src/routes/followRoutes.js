import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import followController from "../controllers/followController.js"; // Controller import edildiğini varsayalım
import { validateFollow } from "../middlewares/validators/followValidator.js";

const router = express.Router();

//Aktif kullanicinin tum takipcilerini getirme
router.get(
    "/followers",
    authenticateToken,
    followController.getAuthenticatedUserFollowers
);

//Aktif kullanıcının takip ettiği kişileri getirme
router.get(
    "/following",
    authenticateToken,
    followController.getAuthenticatedUserFollowing
);

// Belirli bir kullanicinin takipcilerini getirme
router.get(
    "/followers/:followingUserId",
    validateFollow,
    authenticateToken,
    followController.getFollowersById
);

// Belirli bir kullanicinin takip ettiklerini getirme
router.get(
    "/following/:followingUserId",
    validateFollow,
    authenticateToken,
    followController.getFollowingById
);

// Kullanici takip etme
router.post(
    "/:userId",
    validateFollow,
    authenticateToken,
    followController.createFollow
);

// Takip edilen kullanıcıyı takipten cikma
router.delete(
    "/:userId",
    validateFollow,
    authenticateToken,
    followController.deleteFollow
);

// Aktif kullaniciyi takip eden kullaniciyi kaldırma
router.delete(
    "/follower/:followerId",
    validateFollow,
    authenticateToken,
    followController.deleteFollower
);

// Aktif kullanıcının belirli bir kullanıcıyla takip durumunu kontrol etme
router.get(
    "/check/:followingUserId",
    validateFollow,
    authenticateToken,
    followController.checkFollow
);

export default router;
