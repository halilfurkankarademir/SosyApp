/**
 * @fileoverview Tum route'leri birlestirir ve disariya export eder.
 * @module routes/index
 */

import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import authRoutes from "./authRoutes.js";
import likeRoutes from "./likeRoutes.js";
import followRoutes from "./followRoutes.js";
import savedRoutes from "./savedRoutes.js";
import commentRoutes from "./commentRoutes.js";
import searchRoutes from "./searchRoutes.js";

const router = Router();

/**
 * Tum route'leri birlestirir ve disariya import eder.
 * @module routes/index
 * @exports router
 */
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);
router.use("/likes", likeRoutes);
router.use("/follows", followRoutes);
router.use("/saved", savedRoutes);
router.use("/comments", commentRoutes);
router.use("/search", searchRoutes);

export default router;
