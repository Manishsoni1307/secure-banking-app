const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://secure-banking-app-zd8b.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps / curl

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

/**
 * - Routes required
 */

const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");

/**
 * - Use Routes
 */

app.get("/", (req, res) => {
  res.send("Ledger Service is up and running");
});

app.use("/api/users", authRouter);

app.use("/api/accounts", accountRouter);

app.use("/api/transactions", transactionRoutes);

module.exports = app;
