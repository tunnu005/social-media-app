import express from 'express';
const router = express.Router();
import { createPost,getPosts } from '../controllers/postController.js';
import auth from '../middleware/auth.js';

router.post('/create', auth, createPost);
router.get('/', getPosts);

export default router