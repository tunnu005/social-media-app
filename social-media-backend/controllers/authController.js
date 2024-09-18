import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import cloudinary from '../config/cloudinary.js';
dotenv.config()

// Function to create a new user
export const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, password, birthDate, role,email,bio } = req.body;
    const file = req.file
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

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });
    // Create a new user instance
    const newUser = new User({
      username,
      bio,
      password: hashedPassword,
      profilePic:result.secure_url, // This could be a URL or a file path
      birthdate:new Date(birthDate), // Ensure birthDate is stored as a Date object
      role,
      email,
    });

    // console.log(newUser);
    console.log('Creating')
    // Save the user to the database
    const curr = await newUser.save();
    console.log('done');
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      });
      res.cookie('userId',curr._id,{
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })
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
      // const tokens = req.cookies.token; // Assuming you have a middleware to parse cookies
      // console.log(token);
      // Find the user by email
      console.log(username, password);
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(200).json({ success:false,message:` Uh-oh! 🚫 Wrong username or password. Give it another go 🔐!`,description : "login failed" });
      }

      // Generate JWT token
      console.log(user._id)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 10 * 24 * 3600 });
    console.log(token);
    res
      .cookie("token", token, {
        // httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        // sameSite : 'true',
      })

      res.cookie('userId',user.username,{
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })

      res.status(201).json({
         success:true,message:` Hey ${username} 👋, good to see you again! Let’s get things rolling 🚀!`,description : "login successfully",token:token
      });
      

      // console.log("this is cookies : ",token);
      // Send response
      // res.status(201).json();
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
