import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createOrder,
  getMyOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

export default router;