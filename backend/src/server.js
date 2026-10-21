require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  require("./utils/generateToken").validateJwtConfig();
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`StudyGuard server listening on port ${PORT}`);
  });
};

startServer();

module.exports = startServer;
