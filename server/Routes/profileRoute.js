import express from "express";
import { getSpecificUserProfile, updateProfile } from "../Controllers/profileController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";
import upload  from "../Middlewares/multerMiddleware.js";
const router = express.Router();


router.put("/edit-profile/:userId", ensureAuthenticated, upload.single("profilePicture") , updateProfile);


// get user profile using there @username
router.get("/", ensureAuthenticated, getSpecificUserProfile);


export default router;