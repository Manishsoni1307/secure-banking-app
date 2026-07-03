const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  userRegisterController,
  userLoginController,
  userLogoutController,
  getProfile,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

router.post("/logout", authMiddleware, userLogoutController);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile route is working!" });
});

module.exports = router;
