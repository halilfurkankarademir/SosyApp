import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import followController from "../controllers/followController.js"; // Controller import edildiğini varsayalım

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
    authenticateToken,
    followController.getFollowersById
);

// Belirli bir kullanicinin takip ettiklerini getirme
router.get(
    "/following/:followingUserId",
    authenticateToken,
    followController.getFollowingById
);

// Kullanici takip etme
router.post("/:userId", authenticateToken, followController.createFollow);

// Kullanici takipten cikarma
router.delete("/:userId", authenticateToken, followController.deleteFollow);

// Aktif kullanıcının belirli bir kullanıcıyla takip durumunu kontrol etme
router.get(
    "/check/:followingUserId",
    authenticateToken,
    followController.checkFollow
);

export default router;
