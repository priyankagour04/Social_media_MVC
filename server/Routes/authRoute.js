import express from 'express';
import { signup, login, verifyEmail } from '../Controllers/authController.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);


export default router;
