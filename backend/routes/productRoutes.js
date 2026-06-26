import express from "express";
import { addProduct, getProducts, getProductById, getRelatedProducts, getMyProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Add Product
router.post("/add", authMiddleware, upload.single("image"), addProduct);

// Get All Products
router.get("/", getProducts);

router.get("/my-products", authMiddleware, getMyProducts);

router.get("/related/:category/:id", getRelatedProducts);

router.get("/:id", getProductById);

router.put("/update/:id", authMiddleware, updateProduct);

router.delete("/delete/:id", authMiddleware, deleteProduct);

export default router;