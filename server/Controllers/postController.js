import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";

export const createPost = async (req, res) => {
  try {
    const { userId, content, image } = req.body;

    // Find user in the database
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a new post
    const post = new postModel({
      user: userId,
      content,
      image,
    });

    await post.save();

    // Add post to the user's list of posts
    user.posts.push(post._id); // We are assuming you added 'posts' in the user model
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username email") // Populates the user info for each post
      .sort({ createdAt: -1 }); // Sort posts in reverse order
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get posts by a specific user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ user: req.params.userId })
      .populate("user", "username email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts", error });
  }
};

export const updatePost = async (req, res) => {
  try {
  } catch (error) {}
};

export const deletePost = async (req, res) => {
  try {
  } catch (error) {}
};
export const likePost = async (req, res) => {
  try {
  } catch (error) {}
};

export const unlikePost = async (req, res) => {
  try {
  } catch (error) {}
};
