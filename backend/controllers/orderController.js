import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      productId,
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      product: product._id,
      seller: product.seller,
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      amount: product.price,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Orders
export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("product")
      .populate("seller", "name email");

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      seller: req.user.id,
    })
      .populate("product")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
