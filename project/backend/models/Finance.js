// models/Finance.js
const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;
