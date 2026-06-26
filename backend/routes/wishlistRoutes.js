import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Add to Wishlist
router.post("/add", authMiddleware, addToWishlist);

// Get Wishlist
router.get("/", authMiddleware, getWishlist);

// Remove from Wishlist
router.delete(
  "/remove/:productId",
  authMiddleware,
  removeFromWishlist
);

export default router;