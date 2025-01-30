import express from "express";
import { getProfile, getUserProfile, updateProfile } from "../Controllers/profileController.js";
import ensureAuthenticated from "../Middlewares/authMiddleware.js";
import upload  from "../Middlewares/multerMiddleware.js";
const router = express.Router();


router.put("/edit-profile/", ensureAuthenticated, upload.single("profilePicture") , updateProfile);



router.get("/", ensureAuthenticated, getProfile);


router.get('/:username', ensureAuthenticated, getUserProfile);


export default router;