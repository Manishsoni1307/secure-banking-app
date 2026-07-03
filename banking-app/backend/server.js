require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Body parser (VERY IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS (PRODUCTION FIX)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://secure-banking-app-zd8b.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================= ROUTES =================
const authRouter = require("./src/routes/auth.routes");
const accountRouter = require("./src/routes/account.routes");
const transactionRouter = require("./src/routes/transaction.routes");

// IMPORTANT MOUNTING
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Banking Backend is Running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});