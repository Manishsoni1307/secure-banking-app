const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackList.model");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is missing" });
    }
    const token = req.cookies.token || req.header.authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is missing" });
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token: token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is INVALID" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "unauthorized access, token is INVALID" });
  }
}

async function authSystemUserMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is missing" });
    }

    const token = req.cookies.token || req.header.authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is missing" });
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token: token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "unauthorized access, token is INVALID" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("+systemUser");

    if (!user || !user.systemUser) {
      return res.status(403).json({
        message: "Forbidden access, not a system user",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "unauthorized access, token is INVALID" });
  }
}

module.exports = {
  authMiddleware,
  authSystemUserMiddleware,
};
