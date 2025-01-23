import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    // Upload the file on Cloudinary
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded (user profile image)
    console.log("File uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove locally saved temporary file if the upload operation failed
    }
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;
