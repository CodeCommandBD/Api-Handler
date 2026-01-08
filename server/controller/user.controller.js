const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    // user check
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
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
    return res.status(201).send({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "User registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    // user check... user already exists
    const user = await userModel.findOne({email: req.body.email})
    if(!user){
      return res.status(400).send({
        status: false,
        message: "User not found"
      })
    }
    
    // compare password 
    const isPasswordMatched = await user.comparePassword(req.body.password)

    if(!isPasswordMatched){
      return res.status(400).send({
        status: false,
        message: "Invalid Password"
      })
    }


    // generate token 
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    // send response
    return res.status(200).send({
      status: true,
      message: "User login successfully",
      token: "Bearer " + token,  
    })
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "User login failed",
    })
  }
};

const profile = (req, res) => {};

module.exports = {
  register,
  login,
  profile,
};
