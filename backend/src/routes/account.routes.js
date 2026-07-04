const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

router.post("/", authMiddleware, accountController.createAccountController);

// REQUIRED
router.get("/", authMiddleware, accountController.getMyAccountController);

router.get(
  "/balance/:accountId",
  authMiddleware,
  accountController.getAccountBalanceController,
);

router.post(
  "/deposit",
  authMiddleware,
  accountController.depositFundsController,
);

module.exports = router;
