// models/Library.js
const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
