// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
