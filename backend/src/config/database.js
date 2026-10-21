const dns = require("node:dns");

dns.setServers(["10.145.110.101"]);

const mongoose = require("mongoose");

const redactCredentials = (message) => {
  let safeMessage = String(message || "Unknown MongoDB error");

  // Remove URI credentials if a driver error happens to include a connection URI.
  safeMessage = safeMessage.replace(/(mongodb(?:\+srv)?:\/\/)[^\s@]+@/gi, "$1[REDACTED]@");

  for (const secret of [process.env.MONGODB_URI, process.env.JWT_SECRET]) {
    if (secret) safeMessage = safeMessage.split(secret).join("[REDACTED]");
  }

  return safeMessage;
};

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is missing or empty. Set it in backend/.env.");
  }

  if (!/^mongodb(?:\+srv)?:\/\//i.test(uri)) {
    throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://.");
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    // Older versions enforced a global videoId uniqueness constraint. Replace it
    // with per-owner uniqueness so separate accounts can track the same video.
    const videos = mongoose.connection.collection("videos");
    const indexes = await videos.indexes().catch(() => []);
    const legacyVideoIndex = indexes.find((index) => index.unique && index.key?.videoId === 1 && Object.keys(index.key).length === 1);
    if (legacyVideoIndex) await videos.dropIndex(legacyVideoIndex.name);
    await videos.createIndex({ owner: 1, videoId: 1 }, { unique: true });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    const safeError = new Error(redactCredentials(error.message));
    safeError.name = error.name || "Error";
    console.error(`MongoDB connection failed (${safeError.name}): ${safeError.message}`);
    throw safeError;
  }
};

// Handle connection drop/errors after initial connection
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB connection disconnected.");
});

mongoose.connection.on("error", (error) => {
  console.error(`MongoDB runtime error (${error.name || "Error"}): ${redactCredentials(error.message)}`);
});

module.exports = connectDatabase;