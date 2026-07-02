const mongoose = require("mongoose");
const transactionModel = require("../models/transaction.model");
const accountModel = require("../models/account.model");
const ledgerModel = require("../models/ledger.model");
const { sendRegistrationEmail } = require("../services/email.service");

async function createTransactionController(req, res) {
  // STEP 9 (Part 1): Start MongoDB Session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { toAccountId, amount, idempotencyKey } = req.body;
    const cleanToAccountId =
      typeof toAccountId === "string" ? toAccountId.trim() : toAccountId;

    if (!cleanToAccountId || !amount || !idempotencyKey) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Missing required fields" });
    }

    // STEP 2: Validate idempotency key
    const isDuplicate = await transactionModel
      .findOne({ idempotencyKey })
      .session(session);
    if (isDuplicate) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(409)
        .json({ message: "Duplicate transaction detected" });
    }

    // Find accounts inside session context
    const fromAccount = await accountModel
      .findOne({ user: req.user.userId })
      .populate("user")
      .session(session);

    const toAccount = await accountModel
      .findById(cleanToAccountId)
      .populate("user")
      .session(session);

    if (!fromAccount || !toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Account(s) not found" });
    }

    // STEP 3: Check account status
    if (fromAccount.status !== "ACTIVE" || toAccount.status !== "ACTIVE") {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "One or both accounts are frozen or closed" });
    }

    // STEP 4: Validate balance sufficiency
    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // STEP 5: Create transaction entry with PENDING status
    const transactionArray = await transactionModel.create(
      [
        {
          fromAccount: fromAccount._id,
          toAccount: toAccount._id,
          amount,
          idempotencyKey,
          status: "PENDING",
        },
      ],
      { session },
    );
    const newTransaction = transactionArray[0];
    const currentFromBalance =
      typeof fromAccount.balance === "number" ? fromAccount.balance : 0;
    const currentToBalance =
      typeof toAccount.balance === "number" ? toAccount.balance : 0;

    fromAccount.balance = currentFromBalance - Number(amount);
    toAccount.balance = currentToBalance + Number(amount);

    await fromAccount.save({ session });
    await toAccount.save({ session });

    // STEP 6: Create DEBIT ledger entry
    await ledgerModel.create(
      [
        {
          account: fromAccount._id,
          amount,
          transaction: newTransaction._id,
          type: "DEBIT",
        },
      ],
      { session },
    );
    await (() => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    })();

    // STEP 7: Create CREDIT ledger entry
    await ledgerModel.create(
      [
        {
          account: toAccount._id,
          amount,
          transaction: newTransaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    // STEP 8: Mark transaction status as COMPLETED
    newTransaction.status = "COMPLETED";
    await newTransaction.save({ session });

    // STEP 9 (Part 2): Commit MongoDB session
    await session.commitTransaction();
    session.endSession();

    // STEP 10: Send email notification (Asynchronous calls)
    sendRegistrationEmail(
      fromAccount.user.email,
      fromAccount.user.name,
      `Debit Alert: INR ${amount}`,
      `Your account was debited by INR ${amount}.`,
    );
    sendRegistrationEmail(
      toAccount.user.email,
      toAccount.user.name,
      `Credit Alert: INR ${amount}`,
      `Your account was credited with INR ${amount}.`,
    );

    return res.status(201).json({
      message: "Transaction processed completely 🎉",
      transaction: newTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
async function getTransactionHistoryController(req, res) {
  try {
    const userAccount = await accountModel.findOne({ user: req.user.userId });

    if (!userAccount) {
      return res.status(404).json({ message: "Account profile not found" });
    }

    const history = await transactionModel
      .find({
        $or: [{ fromAccount: userAccount._id }, { toAccount: userAccount._id }],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Transaction records retrieved successfully 📊",
      count: history.length,
      transactions: history,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
module.exports = {
  createTransactionController,
  getTransactionHistoryController,
};
