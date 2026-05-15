require("dotenv").config();
const app = require("./src/config/app");
const { connectDB, sequelize } = require("./src/config/db");

// 👇 THIS LINE IS REQUIRED
require("./src/models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // 👇 THIS IS WHAT CREATES TABLES
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();
