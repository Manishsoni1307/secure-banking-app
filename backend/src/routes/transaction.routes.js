const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  createTransactionController,
  getTransactionHistoryController,
} = require("../controllers/transaction.controller");

const router = express.Router();

/**
 * - POST /api/transactions/
 * - Create/Send a new transaction
 */
router.post("/", authMiddleware, createTransactionController);

/**
 * - GET /api/transactions/
 * - Get user transaction history
 */
router.get("/", authMiddleware, getTransactionHistoryController);

// CHANGE THIS LINE TO EXPORT THE ROUTER INSTANCE 🌟
module.exports = router;
