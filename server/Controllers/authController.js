import jwt from "jsonwebtoken"; // Import JSON Web Token generation
import bcrypt from "bcrypt";
import UserModel from "../Models/userModel.js";
import sendVerificationEmail from "../Config/mailer.js";

// verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

    // Find the user and update 'verified' status
    const user = await UserModel.findOneAndUpdate(
      { _id: decoded.id },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Email verification failed" });
  }
};

// Signup function
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (initially set verified to false)
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });

    // Save the user
    await user.save();

    // Generate a JWT token for email verification (not for login)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send verification email with the token
    await sendVerificationEmail(user.email, token);

    // Send response with the token for the client to proceed with email verification
    res.status(201).json({
      message: "Signup successful. Please check your email to verify your account.",
      success: true,
      token, // Send the email verification token
    });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};


// Login function
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the email is verified
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

