const { Chat } = require("../models/chat");

exports.getMessages = async (req, res) => {
  const messages = await Chat.getMessages();
  res.json({ messages });
};
