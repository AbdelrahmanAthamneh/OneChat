const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const chatRouter = require("./routes/chat");
const connectToDatabase = require("./db/database");
const initializeSocket = require("./socket/socket");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS.split(","),
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/chat", chatRouter);

async function startServer() {
  try {
    await connectToDatabase();

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      initializeSocket(server);
    });
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
}

startServer();
