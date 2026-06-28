import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  startConversation,
  sendMessage,
  getMessages,
  getMyChats,
} from "../controllers/chatController.js";

const router = express.Router();

// Start Chat
router.post("/start", authMiddleware, startConversation);

// Send Message
router.post("/send", authMiddleware, sendMessage);

// Get Messages
router.get(
  "/messages/:conversationId",
  authMiddleware,
  getMessages
);

// My Chats
router.get(
  "/my-chats",
  authMiddleware,
  getMyChats
);

export default router;