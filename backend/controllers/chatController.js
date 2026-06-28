import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Product from "../models/Product.js";
import { io } from "../server.js";

export const startConversation = async (req, res) => {
  try {
    const { productId } = req.body;

    const buyerId = req.user.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const sellerId = product.seller;

    // Buyer cannot chat with himself

    if (buyerId === sellerId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot chat with yourself.",
      });
    }

    // Existing conversation

    let conversation = await Conversation.findOne({
      product: productId,
      members: {
        $all: [buyerId, sellerId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        product: productId,
        members: [buyerId, sellerId],
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      text,
    });

    // Sender details populate karo
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "_id name");

    // Sab connected clients ko message bhejo
    io.emit("receiveMessage", populatedMessage);

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getMyChats = async (req, res) => {
  try {

    const conversations = await Conversation.find({
      members: req.user.id,
    })
      .populate("members", "name email")
      .populate("product", "title image price")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};