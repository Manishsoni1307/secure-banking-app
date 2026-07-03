require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB();

const PORT = 5001;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }

  console.log(`Server is running on PORT ${PORT}`);
});
