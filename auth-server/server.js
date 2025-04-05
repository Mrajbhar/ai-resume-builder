require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Server Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`🚀 Server running on port ${PORT}`));
});
