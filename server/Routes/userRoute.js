import express from "express";
import {
  createProfile,
  updateProfile,
  getUserProfile,
  getSpecificUserProfile,
} from "../Controllers/userController.js";

const router = express.Router();
