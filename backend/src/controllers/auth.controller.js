const userModels = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
const tokenBlackListModel = require("../models/blackList.model");
const accountModel = require("../models/account.model");
/**
 * -user register controller
 * -POST /api/auth/register
 */

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await userModels.findOne({
    email: email,
  });
  if (isExists) {
    return res.status(422).json({
      message: "User already exists with email.",
      status: "Failed",
    });
  }
  const user = await userModels.create({
    email,
    password,
    name,
  });

  // Automatically create bank account
  await accountModel.create({
    user: user._id,
    balance: 0,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });

  await emailService.sendRegistrationEmail(user.email, user.name);
}

/**
 * -user Login controller
 * -POST /api/auth/login
 */

async function userLoginController(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
  const user = await userModels.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
    });
  }
  const isValidPassword = await user.comparePassword(password);
  let account = await accountModel.findOne({
    user: user._id,
  });

  if (!account) {
    account = await accountModel.create({
      user: user._id,
      balance: 0,
    });
  }
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}
/**
 * -user Logout controller
 * -POST /api/auth/logout
 */
async function userLogoutController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "User logged out successfully" });
  }
  res.clearCookie("token", " ");

  await tokenBlackListModel.create({ token: token });
  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
};
