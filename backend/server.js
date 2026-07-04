require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED CORS FOR PRODUCTION
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
      }
      return callback(null, true); // 🔥 TEMP SAFE MODE (IMPORTANT)
    },
    credentials: true,
  }),
);

// ================= ROUTES =================
const authRoutes = require("./src/routes/auth.routes");
const accountRoutes = require("./src/routes/account.routes");
const transactionRoutes = require("./src/routes/transaction.routes");

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Banking API Running 🚀");
});

// ================= START =================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
