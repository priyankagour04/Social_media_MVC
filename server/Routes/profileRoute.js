import express from "express";
import { createProfile, getSpecificUserProfile, getUserProfile, updateProfile } from "../Controllers/profileController.js";
const router = express.Router();

router.post("create/profile", createProfile);
router.put("/profile/:userId", getUserProfile);
router.put("edit/profile/:userId", updateProfile);
router.get("/profile/:username", getSpecificUserProfile);
