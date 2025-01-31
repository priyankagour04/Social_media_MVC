import mongoose from "mongoose";
import postModel from "./postModel.js";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "default-profile.jpg" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Cascade delete posts when a user is deleted
userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    // Delete all posts associated with the user
    await postModel.deleteMany({ user: this._id }); // Delete posts where user is the owner
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", userSchema);
