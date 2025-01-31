import userModel from "../Models/userModel.js";

// Send a follow request to another user
export const sendFollowRequest = async (req, res) => {
  const { username } = req.params; // Username of the user to whom the request is being sent
  const senderId = req.user.id; 

  try {
    const user = await userModel.findOne({ username });
    const sender = await userModel.findById(senderId);

    if (!user || !sender) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user._id.toString() === senderId) {
      return res.status(400).json({ message: "You cannot send a follow request to yourself." });
    }

    // Check if already sent/requested
    if (user.receivedRequests.includes(senderId)) {
      return res.status(400).json({ message: "Follow request already sent." });
    }

    // Check if already following
    if (user.followers.includes(senderId)) {
      return res.status(400).json({ message: "You are already following this user." });
    }

    // Add senderId to user's receivedRequests and to sender's pendingRequests
    user.receivedRequests.push(senderId);
    sender.pendingRequests.push(user._id);

    await user.save();
    await sender.save();

    res.status(200).json({
      message: "Follow request sent successfully.",
      userId: user._id,
      userName: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending follow request." });
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
      return res.status(400).json({ message: "No follow request from this user." });
    }

    // Remove follower from receivedRequests and add to followers
    user.receivedRequests = user.receivedRequests.filter(id => id.toString() !== follower._id.toString());
    user.followers.push(follower._id);

    // Remove currentUserId from the follower's pendingRequests and add to their following
    follower.pendingRequests = follower.pendingRequests.filter(id => id.toString() !== currentUserId);
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
      return res.status(400).json({ message: "No follow request from this user." });
    }

    // Remove follower from receivedRequests
    user.receivedRequests = user.receivedRequests.filter(id => id.toString() !== follower._id.toString());

    // Also remove currentUserId from the follower's pendingRequests (cleanup)
    follower.pendingRequests = follower.pendingRequests.filter(id => id.toString() !== currentUserId);

    await user.save();
    await follower.save();

    res.status(200).json({ message: "Follow request rejected." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting follow request." });
  }
};


export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Find the user by ID and populate the followers field with user details
    const user = await userModel.findById(userId).populate("followers", "username email profilePicture");

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


