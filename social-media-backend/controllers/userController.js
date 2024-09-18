import User from '../models/User.js'
export const getUserProfile = async (req, res) => {
    try {
        console.log(req.userId)
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, bio, profileImage } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { name, bio, profileImage }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchUsers = async (searchTerm) => {
    try {
        // Ensure the searchTerm is trimmed and in lowercase for case-insensitive search
        const term = searchTerm.trim().toLowerCase();

        // Find users where the username starts with the searchTerm
        const users = await User.find({
            username: { $regex: `^${term}`, $options: 'i' } // Case-insensitive search
        });
        console.log(users)
        return users;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

export const search = async(req, res) => {
    const { term } = req.query;
    console.log(term);
    if (!term) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const users = await searchUsers(term);
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for users' });
    }
}
