// utils/cloudinary.js
import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No file path provided.");
      return null;
    }

    // Upload the image to Cloudinary
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
    });

    console.log("Image uploaded to Cloudinary successfully:", response.secure_url);
    return { url: response.secure_url };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Cleanup temp image
    }
    return null;
  }
};

export default uploadOnCloudinary;
