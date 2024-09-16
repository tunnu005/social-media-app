import Post from '../models/Post.js'
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const newPost = new Post({ userId: req.userId, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name profileImage');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
