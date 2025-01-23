import express from 'express';
import { acceptFollowRequest, rejectFollowRequest, sendFollowRequest } from '../Controllers/followController.js';

const router = express.Router();

router.post("/follow/send/:userId", sendFollowRequest);
router.post("/follow/accept/:userId", acceptFollowRequest);
router.post("/follow/reject/:userId", rejectFollowRequest);

 

export default router;  
