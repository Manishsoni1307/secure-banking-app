const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");

const {
  userRegisterController,
  userLoginController,
  userLogoutController,
} = require("../controllers/auth.controller");

const router = express.Router();

// REGISTER
router.post("/register", userRegisterController);

// LOGIN
router.post("/login", userLoginController);

// LOGOUT
router.post("/logout", authMiddleware, userLogoutController);

// PROFILE TEST
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile route is working!" });
});

module.exports = router;
