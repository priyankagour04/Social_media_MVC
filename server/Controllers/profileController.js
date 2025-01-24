
import userModel from "../Models/userModel.js";

// export const createProfile = async (req, res) => {
//     try {
//     } catch (error) {}
//   };


  
export const updateProfile = async (req, res) => {
  try {
    const { bio, profilePicture } = req.body; // Optional fields to update
    const userId = req.params.userId || req.user?.id; // Get userId from URL or JWT

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized, user ID is missing" });
    }

    // Find and update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { bio, profilePicture },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};


  
  export const getUserProfile = async (req, res) => {
    try {
    } catch (error) {}
  };
  
  // Get a specific user's profile data using there @username
  export const getSpecificUserProfile = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await userModel.findOne({ username }).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user profile" });
    }
  };