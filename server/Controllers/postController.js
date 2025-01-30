import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";


// uploading image directly from frontend to cloudinary 
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { content, tags, image } = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let imageUrl = image || "";

    // Create a new post
    const post = new postModel({
      user: userId,
      content,
      image: imageUrl, // Store the image URL in the database
      tags,
    });

    await post.save();

    // Add post to the user's list of posts
    user.posts.push(post._id); 
    await user.save();

    res.status(201).json(post); // Send the created post back in the response
  } catch (error) {
    console.error("Error creating post:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error creating post",
      error: error.message || error, // Provide the error message if available
    });
  }
};


// uploading the image from backend to cloudinary


// export const createPost = async (req, res) => {
//   try {
//     const userId = req.user.id; 
//     const { content, tags } = req.body;
//     const imageFile = req.file; 

//     // Find user in the database
//     const user = await userModel.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     let imageUrl = ""; // Initialize imageUrl to empty string

//     // If an image file is provided, upload it to Cloudinary
//     if (imageFile) {
//       const uploadResult = await uploadOnCloudinary(imageFile.path); // Upload image to Cloudinary

//       if (uploadResult) {
//         imageUrl = uploadResult.url; // Store the URL of the uploaded image
//       } else {
//         return res.status(500).json({ message: "Error uploading image to Cloudinary" });
//       }
//     }

//     // Create a new post
//     const post = new postModel({
//       user: userId, // Use 'user' instead of 'userId' to match the schema
//       content,
//       image: imageUrl, // Store the image URL in the database
//       tags,
//     });

//     await post.save();

//     // Add post to the user's list of posts
//     user.posts.push(post._id); // Assuming you added 'posts' in the user model
//     await user.save();

//     res.status(201).json(post);
//   } catch (error) {
//     console.error("Error creating post:", error); // Log the error for debugging
//     res.status(500).json({
//       message: "Error creating post",
//       error: error.message || error, // Provide the error message if available
//     });
//   }
// };



// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username email profilePicture") // Include avatar
      .sort({ createdAt: -1 }); // Sort by newest posts first

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get posts by the authenticated user
export const getUserPosts = async (req, res) => {
  const userId = req.user.id; 
  try {
    const posts = await postModel
      .find({ user: userId }) 
      .populate("user", "username email profilePicture") 
      .sort({ createdAt: -1 }); // Sort posts by most recent

    res.status(200).json(posts); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts", error }); // Handle error
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, image, tags } = req.body;

    // find the post
    const post = await postModel.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found",
      });

    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;

    await post.save();
    res.status(200).json({ message: "Post updated successfully.", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post.", error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by its ID
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    // Find the user associated with the post
    const user = await userModel.findById(post.user);
    if (user) {
      // Remove the post ID from the user's posts array
      user.posts = user.posts.filter((id) => id.toString() !== postId);
      await user.save(); // Save updated user
    } else {
      console.warn(`User for post ${postId} not found in the database.`);
    }

    // Delete the post
    const deletedPost = await postModel.findByIdAndDelete(postId);

    // Verify if the post was successfully deleted
    if (!deletedPost) {
      return res.status(500).json({ message: "Failed to delete the post." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error); // Better error logging
    res.status(500).json({ message: "Error deleting post.", error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id; 

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find the post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Post already liked by this user." });
    }

    // Add user ID to likes
    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      message: "Post liked successfully.",
      totalLikes: post.likes.length, // Total number of likes
    });
  } catch (error) {
    console.error("Error in likePost:", error); // Add logging for debugging
    res.status(500).json({ message: "Error liking post.", error });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Find the post
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found." });

    // Check if the user has not liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post not liked yet." });
    }

    // Remove user ID from likes
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({
      message: "Post unliked successfully.",
      likes: post.likes.length, // Returning the updated like count
    });
  } catch (error) {
    res.status(500).json({ message: "Error unliking the post.", error });
  }
};
