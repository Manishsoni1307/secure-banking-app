const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/**
 * - POST /api/account
 * - Create a new account
 */
router.post("/", authMiddleware, accountController.createAccountController);

/**
 * - GET /api/account/balance/:accountId
 * - Check account balance 
 */
router.get("/balance/:accountId", authMiddleware, accountController.getAccountBalanceController);

/**
 * - POST /api/account/deposit
 * - Deposit funds into account
 */
router.post("/deposit", authMiddleware, accountController.depositFundsController);

module.exports = router;
