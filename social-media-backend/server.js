import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
// import cloudinary from 'cloudinary'

dotenv.config();
connectDB();


const app = express();
app.use(express.json({ limit: '10mb'}));
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'X-Custom-Header'],
        // exposedHeaders: ['X-Custom-Header'],
        // optionsSuccessStatus: 200, // some browsers send 204 instead of 200 for options requests.
    }
));


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
