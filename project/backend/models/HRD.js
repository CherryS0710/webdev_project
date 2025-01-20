// models/HRD.js
const mongoose = require("mongoose");

const hrdSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const HRD = mongoose.model("HRD", hrdSchema);

module.exports = HRD;