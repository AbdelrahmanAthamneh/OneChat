const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

function initializeHandlers(socket) {
  const handlerFolder = path.join(__dirname, "handlers");
  fs.readdirSync(handlerFolder).forEach((file) => {
    const handler = require(path.join(handlerFolder, file));
    handler(socket);
  });
}

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEBSOCKET_CORS_ALLOWED_ORIGINS.split(","),
    },
  });

  const chatNamespace = io.of("/chat");

  chatNamespace.on("connection", (socket) => {
    console.log("user joined!");
    initializeHandlers(socket);
  });
}

module.exports = initializeSocket;
