import userModel from "../Models/userModel.js";
import { sendNotification } from "../Utils/soket.js";
import Notification from "../Models/notificationModel.js"; // Import Notification model

// Send follow request and create a notification
export const sendFollowRequest = async (req, res) => {
  try {
    const { username } = req.params;
    const senderId = req.user?.id; // Assuming authentication middleware sets req.user

    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const recipient = await userModel.findOne({ username });
    const sender = await userModel.findById(senderId);

    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    if (recipient.receivedRequests.includes(senderId)) {
      return res.status(400).json({ message: "Follow request already sent" });
    }

    // Add sender to recipient's received requests
    recipient.receivedRequests.push(senderId);
    sender.pendingRequests.push(recipient._id);
    await Promise.all([recipient.save(), sender.save()]); // Save both in parallel

    // Check if a similar notification already exists
    const existingNotification = await Notification.findOne({
      userId: recipient._id,
      referenceId: sender._id,
      type: "follow",
    });

    if (!existingNotification) {
      // Create a new follow request notification
      const notification = new Notification({
        userId: recipient._id,  
        type: "follow",          
        referenceId: sender._id, 
        message: `${sender.username} sent you a follow request.`,
      });
      await notification.save();

      // Emit real-time notification
      sendNotification(recipient._id.toString(), notification);
    }

    res.status(200).json({
      message: `Follow request sent successfully from ${sender.username} to ${recipient.username}.`,
    });
  } catch (error) {
    console.error("Error sending follow request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Accept a follow request
export const acceptFollowRequest = async (req, res) => {
  const { username } = req.params; // Username of the follower being accepted
  const currentUserId = req.user.id; // ID of the user accepting the request

  try {
    const follower = await userModel.findOne({ username });
    const user = await userModel.findById(currentUserId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the request exists
    if (!user.receivedRequests.includes(follower._id.toString())) {
      return res
        .status(400)
        .json({ message: "No follow request from this user." });
    }

    // Remove follower from receivedRequests and add to followers
    user.receivedRequests = user.receivedRequests.filter(
      (id) => id.toString() !== follower._id.toString()
    );
    user.followers.push(follower._id);

    // Remove currentUserId from the follower's pendingRequests and add to their following
    follower.pendingRequests = follower.pendingRequests.filter(
      (id) => id.toString() !== currentUserId
    );
    follower.following.push(currentUserId);

    await user.save();
    await follower.save();

    res.status(200).json({ message: "Follow request accepted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error accepting follow request." });
  }
};

// Reject a follow request
export const rejectFollowRequest = async (req, res) => {
  const { username } = req.params; // Username of the follower being rejected
  const currentUserId = req.user.id; // ID of the user rejecting the request

  try {
    const follower = await userModel.findOne({ username });
    const user = await userModel.findById(currentUserId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the request exists
    if (!user.receivedRequests.includes(follower._id.toString())) {
      return res
        .status(400)
        .json({ message: "No follow request from this user." });
    }

    // Remove follower from receivedRequests
    user.receivedRequests = user.receivedRequests.filter(
      (id) => id.toString() !== follower._id.toString()
    );

    // Also remove currentUserId from the follower's pendingRequests (cleanup)
    follower.pendingRequests = follower.pendingRequests.filter(
      (id) => id.toString() !== currentUserId
    );

    await user.save();
    await follower.save();

    res.status(200).json({ message: "Follow request rejected." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting follow request." });
  }
};

export const getFollowRequest = async (req, res) => {
  try {
    const userId = req.user.id; // The _id is stored as id in the token payload
    console.log("Authenticated userID:", userId); // Log to verify the userId

    // Find the user in the database using _id (MongoDB's default field)
    const user = await userModel
      .findOne({ _id: userId }) // Corrected query to match the _id field
      .populate("receivedRequests");

    if (!user) {
      console.log("User not found with userid:", userId); // Log if no user is found
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.receivedRequests); // Return the list of received requests
  } catch (error) {
    console.error("Error in getting follow requests:", error); // Log any errors
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFollowStatus = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user?.id;

    // Check if currentUserId exists
    if (!currentUserId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    // Fetch current user & target user
    const user = await userModel.findById(currentUserId);
    const targetUser = await userModel.findOne({ username });

    if (!user || !targetUser) {
      return res
        .status(404)
        .json({ status: "Follow", error: "User not found" });
    }

    // Convert ObjectIds to strings
    const targetUserId = targetUser._id.toString();

    // Check if already following
    if (user.following.includes(targetUserId)) {
      return res.json({ status: "Following" });
    }

    // Check if request is sent
    if (user.pendingRequests.includes(targetUserId)) {
      return res.json({ status: "Requested" });
    }

    // Default to "Follow" if no other status applies
    return res.json({ status: "Follow" });
  } catch (error) {
    console.error("Error in getFollowStatus:", error);
    return res.status(500).json({ status: "Follow", error: "Server error" });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user's ID from authentication middleware

    // Find the user by ID and populate the followers field
    const user = await userModel
      .findById(userId)
      .populate("followers", "username email profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Here are the followers of ${user.username}`,
      followers: user.followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await userModel
      .findById(userId)
      .populate("following", "username email profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Here are the users followed by ${user.username}`,
      following: user.following,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error });
  }
};
