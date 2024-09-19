import Post from '../models/Post.js'
import multer from 'multer';
import cloudinary from '../config/cloudinary.js'; 


export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const file = req.file;
        // console.log(file);
        console.log(typeof req.userId);
        if (!file) {
          return res.status(400).send('No file uploaded');
        }
    
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'image' }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(file.buffer);
        });
        console.log("result",result);
        // Store the image URL and caption in MongoDB
        const newPost = new Post({
          userId: req.userId,
          caption,
          image: result.secure_url,
        });
        console.log("post",newPost);
        const resp =await newPost.save();
        console.log(resp)
        res.status(201).json({ message: 'Boom! 💥 Your post just hit the feed. Get ready for those likes and comments to roll in 🔥!',description:'post uploaded successfully!', success: true });
      } catch (error) {
        res.status(500).json({ error: error });
      }
};

export const getPosts = async (req, res) => {

    const {userId} = req.params
    try {
        const posts = await Post.find({userId:userId}).populate('userId','username profilePic');
        console.log(posts);
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const gethomepost = async(req,res) => {
  
  const { page , limit  } = req.params;

  try {
      // Fetch posts from the database with pagination
      const posts = await Post.find({ userId })
          .skip((page - 1) * limit)
          .limit(parseInt(limit))
          .exec();

      res.json(posts);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

