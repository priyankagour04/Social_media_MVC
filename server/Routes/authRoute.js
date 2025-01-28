import express from 'express';
import { signup, login, verifyEmail } from '../Controllers/authController.js'
import { loginValidation } from '../Middlewares/authValidation.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', loginValidation, login);
router.get('/verify-email/:token', verifyEmail);


export default router;
