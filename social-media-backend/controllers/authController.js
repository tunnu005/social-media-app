import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

// Function to create a new user
export const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, password, profilePic, birthDate, role,email } = req.body;
    // console.log({ username, password, bio, profilePic, birthDate, role })

    // Check if the username is already taken
    console.log(typeof birthDate)
    console.log(birthDate)
    const existingUser = await User.findOne({ username });
    console.log(existingUser)
    if (existingUser) {
      return res.status(200).json({ success: false,message:`Uh-oh! 🚫 We hit a snag with your registration. Give it another shot or reach out to us for assistance 🛠️.`, description:"registration failed (email/Username already exist)"});
    }
    
    // Hash the password before saving it to the database()
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      profilePic, // This could be a URL or a file path
      birthDate, // Ensure birthDate is stored as a Date object
      role,
      email
    });

    // console.log(newUser);
    console.log('Creating')
    // Save the user to the database
    await newUser.save();
    console.log('done');
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      });
    // console.log(savedUser)
    // console.log(savedUser);
    // Respond with the saved user data (excluding the password)
    res.status(201).json({
     success: true,message:`Awesome! 😎 You’re all set, ${username}! Welcome to the team 🌟. Let’s get started!`,description : "Account created successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the user by email
      console.log(username, password);
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(200).json({ success:false,message:` Uh-oh! 🚫 Wrong username or password. Give it another go 🔐!`,description : "login failed" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      });

      // Send response
      res.status(201).json({ success:true,message:` Hey ${username} 👋, good to see you again! Let’s get things rolling 🚀!`,description : "login successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
