const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.cyanBright("✅ MongoDB Connected"));
  } catch (err) {
    console.error(chalk.redBright("❌ MongoDB Connection Error:"), err);
    process.exit(1);
  }
};

module.exports = connectDB;
