import express from 'express';
import { addCommentToPost, deleteComment, replyOnComment, updateComment } from '../Controllers/commentController';

const router = express.Router();

router.post(':postId/comments', addCommentToPost );

router.put('/comments/:commentId', updateComment );

router.delete('/:postId/comments/:commentId', deleteComment);

router.post('/:postId/comments/:commentId/reply', replyOnComment);

export default router;
