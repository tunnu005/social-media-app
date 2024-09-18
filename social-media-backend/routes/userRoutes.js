import express from 'express';
const router = express.Router();
import { getUserProfile,search,updateProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateProfile);
router.get('/search', search)

export default router