const accountModel = require("../models/account.model");

// Existing Account Creation Function
async function createAccountController(req, res) {
  try {
    const { accountType, balance } = req.body;

    const newAccount = await accountModel.create({
      accountType,
      balance,
      user: req.user.userId,
    });

    return res.status(201).json({
      message: "Account created successfully 🎉",
      account: newAccount,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

// New Balance Verification Function
async function getAccountBalanceController(req, res) {
  try {
    const { accountId } = req.params;
    const cleanId =
      typeof accountId === "string" ? accountId.trim() : accountId;

    const account = await accountModel.findById(cleanId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({
      accountId: account._id,
      balance: account.balance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

// Paste this function at the bottom of the file
async function depositFundsController(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    // Find this user's account and increment their balance
    const account = await accountModel.findOneAndUpdate(
      { user: req.user.userId },
      { $inc: { balance: Number(amount) } },
      { new: true },
    );

    if (!account) {
      return res.status(404).json({ message: "Account profile not found" });
    }

    return res.status(200).json({
      message: "Funds deposited successfully 💰",
      accountId: account._id,
      balance: account.balance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createAccountController,
  getAccountBalanceController,
  depositFundsController,
};
