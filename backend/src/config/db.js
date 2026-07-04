const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Server is connected to DB"); // 🔥 This log must be present!
  } catch (error) {
    console.error("Database connection failure error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
