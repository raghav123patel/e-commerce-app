const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.registerUser = async(req,res) => {
    try{
      const {name, email, password, role} = req.body;
      console.log(name, email, password);
      if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "please provide all details",
        })
      }
      const isExisting = await Users.findOne({email});
      if(isExisting){
        return res.status(400).json({
            success: false,
            message: "user already exists",
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerUser = await Users.create({
        name,
        email,
        password: hashedPassword,
        role,
      })
       return res.status(200).json({
            success: true,
            registerUser,
            message: "user registered successfully",
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered",
        })
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered", 
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}; 