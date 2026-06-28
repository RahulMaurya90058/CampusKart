import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", authMiddleware, addReview);

router.get("/:productId", getReviews);

export default router;