const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




 
  
  
  const register = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if ( !email || !password) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      
      const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

      const hashedPassword = await bcrypt.hash(password, 10);
      
       await User.create({
        email,
        password: hashedPassword,
      });
      
        
      
      return res.status(201).json({
        message:
          "Account has been created.",
          success: true,
        });
      } catch (error) {
        console.log(error);
      }
    };

    

    
  const login = async (req, res) => {
      try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({
            message: "Email or Password is missing",
            success: false,
          });
        }
    
        const user = await User.findOne({ email });
        
        if (!user) {
          return res.status(400).json({
            message: "Invalid email or password",
            success: false,
          });
        }
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatch) {
          return res.status(400).json({
            message: "Invalid email or password",
            success: false,
          });
        }
    
        const tokenData = {
          userId: user._id,
        };
    
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
    
        const userData = {
          id: user._id,
          email: user.email,
        };
        
    
        return res
          .status(200)
          .cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
          })
          .json({
            message: "Login successful",
            user: userData,
            success: true,
          });
      } catch (error) {
        console.error(`Login error for email: ${req.body.email || "unknown"} -`, error);
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
    };
    
    

 

 

    module.exports = {  register , login};