import User from '../models/User.js'
export const getUserProfile = async (req, res) => {
    try {
        // console.log(req.userId)
        const {userId} = req.params
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getuser = async (req, res) => {
    try {
        console.log(req.userId)
        // const {username} = req.params
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


export const followUser = async (req, res) => {
    try {
        const { usernameToFollow } = req.body;  // The username of the user to follow
        const currentUsername = req.body.currentUsername; // The username of the current user

        // Find and update the current user by username
        const user = await User.findOneAndUpdate(
            { username: currentUsername },  // Query by current user's username
            { $addToSet: { following: usernameToFollow } },  // Add the target username to the `following` list
            { new: true }  // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'Current user not found' });
        }

        // Optionally, update the followed user to add the current user's username to their followers
        const followedUser = await User.findOneAndUpdate(
            { username: usernameToFollow },  // Query by the target username
            { $addToSet: { followers: currentUsername } },  // Add the current username to the `followers` list
            { new: true }  // Return the updated document
        );

        if (!followedUser) {
            return res.status(404).json({ message: 'User to follow not found' });
        }

        return res.status(200).json({ user, followedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error following user' });
    }
};


// Unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const { currentUsername, usernameToUnfollow } = req.body;
        console.log(currentUsername, usernameToUnfollow);
        // Fetch the users by username
        const currentUser = await User.findOne({ username: currentUsername });
        const userToUnfollow = await User.findOne({ username: usernameToUnfollow });

        if (!currentUser || !userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if currentUser is following the userToUnfollow
        const isFollowing = currentUser.following.includes(userToUnfollow.username);
        if (!isFollowing) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove userToUnfollow from currentUser's following list
        currentUser.following = currentUser.following.filter(
            (userId) => userId.toString() !== userToUnfollow.username.toString()
        );

        // Remove currentUser from userToUnfollow's followers list
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (userId) => userId.toString() !== currentUser.username.toString()
        );

        // Save both users
        await currentUser.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error while unfollowing user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

