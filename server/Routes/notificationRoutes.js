import express from "express";
import {
  createNotification,
  getNotification,
  getSingleNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Create a new notification
router.post("/", createNotification);

// Get all notifications for a user
router.get("/:userId", getNotification);

// Get a single notification by ID
router.get("/single/:id", getSingleNotification);

export default router;
