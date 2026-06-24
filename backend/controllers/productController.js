import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      seller: req.user.id,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email"
    );

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};