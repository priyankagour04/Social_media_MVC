import express from "express";
import {
  acceptFollowRequest,
  getFollowers,
  getFollowing,
  getFollowRequest,
  getFollowStatus,
  rejectFollowRequest,
  sendFollowRequest,
} from "../Controllers/followController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send/:username", ensureAuthenticated, sendFollowRequest);
router.post("/accept/:username", ensureAuthenticated, acceptFollowRequest);
router.post("/reject/:username", ensureAuthenticated, rejectFollowRequest);
router.get("/received-req", ensureAuthenticated, getFollowRequest);
router.get("/status/:username", ensureAuthenticated, getFollowStatus);
router.get("/followers", ensureAuthenticated, getFollowers);
router.get("/following", ensureAuthenticated, getFollowing);

export default router;
