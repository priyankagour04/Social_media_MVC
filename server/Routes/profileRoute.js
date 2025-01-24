import express from "express";
import { getSpecificUserProfile, getUserProfile, updateProfile } from "../Controllers/profileController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";
const router = express.Router();

// router.post("create/profile", createProfile);
// router.put("/:userId", getUsersProfile);
router.put("/edit/:userId", ensureAuthenticated, updateProfile);

// get user profile using there @username
router.get("/:username", ensureAuthenticated, getSpecificUserProfile);


export default router;