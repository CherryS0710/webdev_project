// models/ITGroup.js
const mongoose = require("mongoose");

const itGroupSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ITGroup = mongoose.model("ITGroup", itGroupSchema);

module.exports = ITGroup;
