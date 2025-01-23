import express from 'express';
import { createPost, deletePost, getAllPosts, getUserPosts, likePost, unlikePost, updatePost } from '../Controllers/postController.js';

const router = express.Router();

router.post('/create', createPost);

// Route to get all posts
router.get('/allPosts', getAllPosts);

// Route to get posts by a specific user
router.get('/getPost/:userId', getUserPosts);

// Update a post by post ID
router.put('/:postId', updatePost);

// Delete a post by post ID
router.delete('/:postId', deletePost);

// Like a post by post ID
router.patch('/:postId/like', likePost);

// Unlike a post by post ID
router.patch('/:postId/unlike', unlikePost);


export default router;