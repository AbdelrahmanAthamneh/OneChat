const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectToDatabase;
