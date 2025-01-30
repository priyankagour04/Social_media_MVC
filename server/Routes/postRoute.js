import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
  unlikePost,
  updatePost,
} from "../Controllers/postController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create",ensureAuthenticated , createPost);

// Route to get all posts
router.get("/allPosts", ensureAuthenticated, getAllPosts);

// Route to get posts by a specific user

router.get("/getPost", ensureAuthenticated, getUserPosts);

// Update a post by post ID
router.put("/:postId", updatePost);

// Delete a post by post ID
router.delete("/:postId", deletePost);

// Like a post by post ID
router.patch("/:postId/like", likePost);

// Unlike a post by post ID
router.patch("/:postId/unlike", unlikePost);

export default router;
