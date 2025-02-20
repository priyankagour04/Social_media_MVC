import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String }, 
  tags: { type: [String] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

// Auto-populate user details on find queries
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username profilePicture", // Only return username and profileImg
  });
  next();
});

export default mongoose.model("Post", postSchema);
