const { messageModel } = require("../../models/chat");

module.exports = async (socket) => {
  socket.on("message", async (message) => {
    socket.broadcast.emit("message", message);
    const newMessage = new messageModel({
      sender: message.sender,
      text: message.text,
    });
    await newMessage.save();
  });
};
