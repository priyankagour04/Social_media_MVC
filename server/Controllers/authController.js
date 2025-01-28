import jwt from "jsonwebtoken"; // Import JSON Web Token generation
import bcrypt from "bcrypt";
import UserModel from "../Models/userModel.js"; // Ensure the import ends with .js
import userModel from "../Models/userModel.js";

// verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user and updated 'verified' status
    const user = await userModel.findOneAndUpdate(
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
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    // Send response
    res.status(201).json({
      message: "Signup successfully",
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token, // Include the token in the response
    });
  } catch (err) {
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

