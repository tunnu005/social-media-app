import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

// Function to create a new user
export const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, password, profilePic, birthdate, role,email } = req.body;
    // console.log({ username, password, bio, profilePic, birthdate, role })

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      profilePic, // This could be a URL or a file path
      birthdate, // Ensure birthdate is stored as a Date object
      role,
      email
    });

    console.log(newUser);
    console.log('Creating')
    // Save the user to the database
    await newUser.save();
    // console.log(savedUser)
    // console.log(savedUser);
    // Respond with the saved user data (excluding the password)
    res.status(201).json({
     message:'done'
    });

  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
          httpOnly: true,      // Cookie cannot be accessed by JavaScript
          // secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
          maxAge: 60 * 60 * 1000, // 1 hour
          sameSite: 'Strict'   // Prevent CSRF
      });

      // Send response
      res.json({ message: 'Login successful' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
