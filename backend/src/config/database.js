const mongoose = require("mongoose");
const dns = require("dns");

// Force Google Public DNS to bypass local ISP/network SRV lookup failures
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(`Error Details: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection drop/errors after initial connection
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB connection disconnected.");
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ Runtime MongoDB Error: ${err.message}`);
});

module.exports = connectDatabase;