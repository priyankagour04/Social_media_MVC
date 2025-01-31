import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  getUserPostsByUsername,
  likePost,
  unlikePost,
  updatePost,
} from "../Controllers/postController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/create", ensureAuthenticated, upload.single("image"), createPost);

// Route to get all posts
router.get("/allPosts", ensureAuthenticated, getAllPosts);

// Route to get posts by a specific user

router.get("/getPost", ensureAuthenticated, getUserPosts);

// Update a post by post ID
router.put("/:postId", updatePost);

// Delete a post by post ID
router.delete("/:postId", deletePost);

// Like a post by post ID
router.patch("/:postId/like", ensureAuthenticated, likePost);

// Unlike a post by post ID
router.patch("/:postId/unlike", ensureAuthenticated, unlikePost);


router.get("/getUserPost/:username", ensureAuthenticated, getUserPostsByUsername);

export default router;
