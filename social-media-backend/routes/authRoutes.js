import express from 'express'
const router = express.Router();
import { createUser,login } from '../controllers/authController.js';
// import Auth from '../middleware/auth.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

router.post('/signup', upload.single('file'),createUser);
router.post('/login',login);
// router.get('/',Auth,(req,res)=>{
//     console.log("auth route")
//     console.log(req.userId);
//     return res.json({message:"success"})
// })

export default router;