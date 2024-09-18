import express from 'express';
const router = express.Router();
import { createPost,getPosts } from '../controllers/postController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';



const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', auth, upload.single('file'), createPost);
router.get('/getpost/:userId', getPosts);

export default router