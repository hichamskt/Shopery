const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const path = require("path");
const { Console } = require("console");

const updateAcountSettings = async (req, res) => {
  try {
    const { email, updatedemail, firstName, lastName, phoneNumber, images } =
      req.body;
    if (!email) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const profile = req.files?.images?.[0]
      ? path.join("uploads", "images", req.files.images[0].filename)
      : null;

    console.log("profile", profile);

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    console.log(updatedemail);

    user.email = updatedemail;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.images = profile;

    const updatedUser = await user.save();

    res.status(201).json({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateBillingAddress = async (req, res) => {
  try {
    const {
      email,
      billingAdresse,
      billingRegion,
      billingFirstName,
      billingLastName,
      billingEmail,
      billingphoneNumber,
      companyName,
      zipCode,
      city,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }
    console.log("submited:");
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.billingAdresse = billingAdresse;
    user.billingRegion = billingRegion;
    user.billingFirstName = billingFirstName;
    user.billingLastName = billingLastName;
    user.billingEmail = billingEmail;
    user.billingphoneNumber = billingphoneNumber;
    user.companyName = companyName;
    user.zipCode = zipCode;
    user.city = city;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Billing address updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No User were found",
        success: false,
      });
    }

    return res.status(201).json({
      message: "User info were found.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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
      message: "Account has been created.",
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
      id: user._id,
    };

    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      id: user._id,
      email: user.email,
    };
    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("jwt", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Login successful",
        user: userData,
        accessToken,
        success: true,
      });
  } catch (error) {
    console.error(
      `Login error for email: ${req.body.email || "unknown"} -`,
      error
    );
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is missing.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid  password.",
        success: false,
      });
    }

    if (!newPassword || newPassword.trim().length < 8) {
      return res.status(400).json({
        message: "New password is invalid or too short.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "1d" }
    );
    res.json({ accessToken });
  });
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";

  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const getUserBillingInfo = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.sendStatus(403);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.sendStatus(403);
    }

    const userBillinginfo = {
      billingAdresse: user.billingAdresse,
      billingRegion: user.billingRegion,
      billingFirstName: user.billingFirstName,
      billingLastName: user.billingLastName,
      billingEmail: user.billingEmail,
      billingphoneNumber: user.billingphoneNumber,
      city: user.city,
      zipCode: user.zipCode,
      companyName: user.companyName,
    };

    return res.status(200).json({
      message: "user Billing infos",
      userBillinginfo,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getLikedProducts = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is missing",
        success: false,
      });
    }

    const Products = await User.findOne({ email }).populate("likedProducts");

    return res.status(200).json({
      likedProducts: Products.likedProducts,
    });
  } catch (error) {
    console.log(error);
  }
};





const toggleLikedProduct = async (req, res) => {
  const { email, productId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.likedProducts.indexOf(productId);

    if (index === -1) {
      
      user.likedProducts.push(productId);
      await user.save();
      return res.status(200).json({ message: "Product liked", likedProducts: user.likedProducts });
    } else {
      
      user.likedProducts.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: "Product unliked", likedProducts: user.likedProducts });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  register,
  login,
  handleRefreshToken,
  handleLogout,
  getUserBillingInfo,
  getUserInfo,
  updateAcountSettings,
  updateBillingAddress,
  changePassword,
  getLikedProducts,
  toggleLikedProduct
};
