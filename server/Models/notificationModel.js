  import mongoose from 'mongoose';

  const { Schema } = mongoose;

  const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },  // Types: like, comment, follow
    referenceId: { type: Schema.Types.ObjectId, required: true },  // The ID of the post, comment, or follow
    message: { type: String, required: true },  // Message describing the activity
    seen: { type: Boolean, default: false },   // Notification seen status
    createdAt: { type: Date, default: Date.now }
  });

  export default mongoose.model('Notification', notificationSchema);
