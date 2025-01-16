// models/Instrumentation.js
const mongoose = require("mongoose");

const instrumentationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Instrumentation = mongoose.model("Instrumentation", instrumentationSchema);

module.exports = Instrumentation;
