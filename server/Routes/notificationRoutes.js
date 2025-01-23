import express from 'express';
import { getNotification, createNotification } from '../Controllers/notificationController.js';

const router = express.Router();

router.get('/:userId', getNotification); 

// Route to create a new notification
router.post('/', createNotification);

export default router;
