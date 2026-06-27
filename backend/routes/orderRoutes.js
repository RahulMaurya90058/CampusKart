import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";



const router = express.Router();

router.post("/create", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/seller-orders", authMiddleware, getSellerOrders);

router.put(
  "/update-status/:id",
  authMiddleware,
  updateOrderStatus
);



export default router;