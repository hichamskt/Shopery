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

 

 

    module.exports = {  register};