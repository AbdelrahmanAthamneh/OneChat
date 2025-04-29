const express = require("express");
const { getMessages } = require("../controllers/chat");

const router = express.Router();

router.get("/get-messages", getMessages);
module.exports = router;
