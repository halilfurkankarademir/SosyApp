import adminController from "../controllers/adminController.js";
import express from "express";
import {
    authenticateToken,
    checkAdminMiddleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Admin paneli icin dashboard verilerini alır.
 */
router.get(
    "/dashboard",
    authenticateToken,
    checkAdminMiddleware,
    adminController.getDashboardDatas
);

/**
 * Admin paneli icin tüm kullanıcı verilerini alır.
 */
router.get(
    "/users",
    authenticateToken,
    checkAdminMiddleware,
    adminController.getAllUsers
);

/**
 * Admin paneli icin tüm gönderi verilerini alır.
 */
router.get(
    "/posts",
    authenticateToken,
    checkAdminMiddleware,
    adminController.getAllPosts
);

/**
 * Admin paneli icin tüm yorum verilerini alır.
 */
router.get(
    "/comments",
    authenticateToken,
    checkAdminMiddleware,
    adminController.getAllComments
);

/**
 * Admin paneli icin uygulama ayarlarını alır.
 */
router.get(
    "/settings",
    authenticateToken,
    checkAdminMiddleware,
    adminController.getAppSettings
);

/**
 * Uygulamanin bakimda olup olmadığını kontrol eder.
 */
router.get("/check-maintenance", adminController.checkMaintenance);

/**
 * Kullanıcı rolunu günceller.
 */
router.put(
    "/users/:userId/role",
    authenticateToken,
    checkAdminMiddleware,
    adminController.updateUserRole
);

/**
 * Uygulama ayarlarını günceller.
 */
router.put(
    "/settings",
    authenticateToken,
    checkAdminMiddleware,
    adminController.updateAppSettings
);

/**
 * Kullaniciyi siler.
 */
router.delete(
    "/users/:userId",
    authenticateToken,
    checkAdminMiddleware,
    adminController.deleteUser
);

/**
 * Gonderiyi siler.
 */
router.delete(
    "/posts/:postId",
    authenticateToken,
    checkAdminMiddleware,
    adminController.deletePost
);

/**
 * Yorumu siler.
 */
router.delete(
    "/comments/:commentId",
    authenticateToken,
    checkAdminMiddleware,
    adminController.deleteComment
);

export default router;
