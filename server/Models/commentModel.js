import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },  // For replies
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],  // Store replies as an array of Comment ObjectIds
    createdAt: { type: Date, default: Date.now },
  });
  

export default mongoose.model('Comment', commentSchema);

