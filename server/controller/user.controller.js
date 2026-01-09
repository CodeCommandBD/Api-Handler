const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  try {
    // Input validation
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Username, email, and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Invalid email format",
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).send({
        status: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Username validation
    if (username.length < 3) {
      return res.status(400).send({
        status: false,
        message: "Username must be at least 3 characters long",
      });
    }

    // Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({
        status: false,
        message: "Email already registered",
      });
    }

    // Check if username already exists
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({
        status: false,
        message: "Username already taken",
      });
    }

    // Create new user
    const newUser = new userModel({
      username,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).send({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).send({
        status: false,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      });
    }

    return res.status(500).send({
      status: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Input validation
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Email and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Invalid email format",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).send({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Check JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).send({
        status: false,
        message: "Server configuration error",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response with user data
    return res.status(200).send({
      status: true,
      message: "User login successfully",
      token: "Bearer " + token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      status: false,
      message: "User login failed",
      error: error.message,
    });
  }
};

// profile protected route
const profile = (req, res) => {
  try {
    // Check if user exists in request (set by passport middleware)
    if (!req.user) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    // Return user profile
    return res.status(200).send({
      status: true,
      message: "Profile retrieved successfully",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).send({
      status: false,
      message: "Failed to retrieve profile",
      error: error.message,
    });
  }
};

// PUT - Update full profile (username, email)
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!username && !email) {
      return res.status(400).send({
        status: false,
        message: "At least one field (username or email) is required",
      });
    }

    // Username validation if provided
    if (username) {
      if (username.length < 3) {
        return res.status(400).send({
          status: false,
          message: "Username must be at least 3 characters long",
        });
      }

      // Check if username already exists (excluding current user)
      const existingUsername = await userModel.findOne({
        username,
        _id: { $ne: userId },
      });
      if (existingUsername) {
        return res.status(400).send({
          status: false,
          message: "Username already taken",
        });
      }
    }

    // Email validation if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({
          status: false,
          message: "Invalid email format",
        });
      }

      // Check if email already exists (excluding current user)
      const existingEmail = await userModel.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingEmail) {
        return res.status(400).send({
          status: false,
          message: "Email already registered",
        });
      }
    }

    // Update user
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return res.status(200).send({
      status: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).send({
      status: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// PATCH - Update email only (with password verification)
const updateEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Email and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Invalid email format",
      });
    }

    // Get current user
    const user = await userModel.findById(userId);

    // Verify password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).send({
        status: false,
        message: "Invalid password",
      });
    }

    // Check if email already exists
    const existingEmail = await userModel.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingEmail) {
      return res.status(400).send({
        status: false,
        message: "Email already registered",
      });
    }

    // Update email
    user.email = email;
    await user.save();

    return res.status(200).send({
      status: true,
      message: "Email updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update email error:", error);
    return res.status(500).send({
      status: false,
      message: "Failed to update email",
      error: error.message,
    });
  }
};

// PATCH - Update password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        status: false,
        message: "Current password and new password are required",
      });
    }

    // New password validation
    if (newPassword.length < 6) {
      return res.status(400).send({
        status: false,
        message: "New password must be at least 6 characters long",
      });
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return res.status(400).send({
        status: false,
        message: "New password must be different from current password",
      });
    }

    // Get current user
    const user = await userModel.findById(userId);

    // Verify current password
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if (!isPasswordMatched) {
      return res.status(400).send({
        status: false,
        message: "Current password is incorrect",
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    return res.status(200).send({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).send({
      status: false,
      message: "Failed to update password",
      error: error.message,
    });
  }
};

// DELETE - Delete account (with password verification)
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password is required to delete account",
      });
    }

    // Get current user
    const user = await userModel.findById(userId);

    // Verify password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).send({
        status: false,
        message: "Invalid password",
      });
    }

    // Delete user
    await userModel.findByIdAndDelete(userId);

    return res.status(200).send({
      status: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).send({
      status: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  profile,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteAccount,
};
