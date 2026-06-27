import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";


const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  createRazorpayOrder
);

router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);

export default router;