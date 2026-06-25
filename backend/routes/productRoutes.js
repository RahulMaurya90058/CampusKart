import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Add Product
router.post("/add", authMiddleware, upload.single("image"), addProduct);

// Get All Products
router.get("/", getProducts);

export default router;