import Notification from "../Models/notificationModel.js";
import userModel from "../Models/userModel.js"; // Ensure correct import
import { sendNotification } from "../Utils/soket.js";

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { recipientId, senderId, senderUsername, type, message } = req.body;

    if (!recipientId || !senderId || !senderUsername || !type || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a similar notification already exists
    const existingNotification = await Notification.findOne({
      userId: recipientId,
      referenceId: senderId,
      type,
    });

    if (existingNotification) {
      return res.status(409).json({ message: "Notification already exists" });
    }

    // Create and save the notification
    const notification = new Notification({
      userId: recipientId,
      type,
      referenceId: senderId,
      message: `${senderUsername} ${message}`,
    });

    await notification.save();

    // Emit real-time notification
    sendNotification(recipientId, notification);

    res.status(201).json({ message: "Notification created successfully", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all notifications for a user
export const getNotification = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch latest notifications
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }) 
      .limit(10); 

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single notification by ID
export const getSingleNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ notification });
  } catch (error) {
    console.error("Error fetching single notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};