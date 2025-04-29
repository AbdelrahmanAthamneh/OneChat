const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  sentAt: { type: Date, required: true, default: Date.now },
});

const messageModel = mongoose.model("Message", messageSchema);

class Chat {
  static async getMessages() {
    const messages = await messageModel.find({});
    return messages;
  }
}

module.exports = {
  Chat,
  messageModel,
};
