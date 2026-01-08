const userModel = require("../models/user.models");
const register = async (req, res) => {
  try {
    // user check
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // user create
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "User registration failed",
    });
  }
};

const login = (req, res) => {};

const profile = (req, res) => {};

module.exports = {
  register,
  login,
  profile,
};
