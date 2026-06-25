import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "CampusKart",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
      };

      const result = await uploadFromBuffer();
      imageUrl = result.secure_url;
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      image: imageUrl,
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