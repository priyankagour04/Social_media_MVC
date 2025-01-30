import userModel from "../Models/userModel.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";  // The Cloudinary upload function
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';

export const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing userId" });
    }

    console.log(`Updating profile for user: ${userId}`);

    // Find the user in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If no new bio is provided, use the existing one
    user.bio = bio || user.bio;

    // If profile picture is uploaded, upload it to Cloudinary
    if (req.file) {
      console.log("Profile picture file:", req.file);
      let uploadedImage;

      try {
        // Upload profile picture to Cloudinary
        uploadedImage = await uploadOnCloudinary(req.file.path); // Upload to Cloudinary
        user.profilePicture = uploadedImage.url; // Update the user's profile picture URL

        // Clean up local file after upload to Cloudinary
        fs.unlinkSync(req.file.path); // Remove the file from the temp directory to avoid file clutter
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // Save the updated user details in the database
    await user.save();
    console.log("User profile successfully updated");

    // Return the updated user data
    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating profile.",
      error: error.message,
    });
  }
};






















  
  export const getUserProfile = async (req, res) => {
    try {
    } catch (error) {}
  };


  
  // Get a specific user's profile data using there @username
  // Backend - Express route
  export const getProfile = async (req, res) => {
    const userId = req.user.id; // Using the userId from the JWT token
  
    try {
      const user = await userModel.findById(userId).select("-password"); // Find user by ID (exclude password)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user); // Send user data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user profile" });
    }
  };