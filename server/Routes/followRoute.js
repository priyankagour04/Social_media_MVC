import express from 'express';
import { acceptFollowRequest, rejectFollowRequest, sendFollowRequest } from '../Controllers/followController.js';
import ensureAuthenticated from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post("/send/:username", ensureAuthenticated, sendFollowRequest);
router.post("/accept/:username", ensureAuthenticated, acceptFollowRequest);
router.post("/reject/:username",ensureAuthenticated, rejectFollowRequest);

 

export default router;  
