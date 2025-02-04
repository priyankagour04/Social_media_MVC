import express from 'express';
import { acceptFollowRequest, getFollowRequest, rejectFollowRequest, sendFollowRequest } from '../Controllers/followController.js';
import ensureAuthenticated from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post("/send/:username",ensureAuthenticated, sendFollowRequest);
router.post("/accept/:username", ensureAuthenticated, acceptFollowRequest);
router.post("/reject/:username",ensureAuthenticated, rejectFollowRequest);
router.get("/received-req", ensureAuthenticated, getFollowRequest)

 

export default router;  
