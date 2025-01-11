// models/Bulletin.js
const mongoose = require("mongoose");

const bulletinSchema = new mongoose.Schema({
  section: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bulletin", bulletinSchema);