import express from 'express';
const router = express.Router();
import { getUserProfile,updateProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateProfile);

export default router