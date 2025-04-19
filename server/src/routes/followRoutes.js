import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import followController from "../controllers/followController.js"; // Controller import edildiğini varsayalım

const router = express.Router();

// Aktif kullanicinin tum takipcilerini getirme
// router.get(
//     "/",
//     authenticateToken,
//     followController.getAuthenticatedUserFollowers
// );

// Kullanici takip etme
router.post("/:userId", authenticateToken, followController.createFollow);

// Kullanici takipten cikarma
router.delete("/:userId", authenticateToken, followController.deleteFollow);

// Aktif kullanıcının takip ettiği kişileri getirme
// router.get(
//     "/following",
//     authenticateToken,
//     followController.getAuthenticatedUserFollowing
// );

// Belirli bir kullanıcının takipçilerini getirme
// router.get(
//     "/:userId/followers",
//     authenticateToken,
//     followController.getUserFollowers
// );

// Aktif kullanıcının belirli bir kullanıcıyla takip durumunu kontrol etme
router.get(
    "/check/:followingUserId",
    authenticateToken,
    followController.checkFollow
);

// Belirli bir kullanıcının takipçi sayısını getirme
// router.get(
//     "/:userId/followers/count",
//     authenticateToken,
//     followController.getFollowerCount
// );

// Belirli bir kullanıcının takip ettiği kişi sayısını getirme
// router.get(
//     "/:userId/following/count",
//     authenticateToken,
//     followController.getFollowingCount
// );

export default router;
