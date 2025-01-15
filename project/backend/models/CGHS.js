// models/CGHS.js
const mongoose = require("mongoose");

const cghsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CGHS = mongoose.model("CGHS", cghsSchema);

module.exports = CGHS;