import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Product
router.post("/add", authMiddleware, addProduct);

// Get All Products
router.get("/", getProducts);

export default router;