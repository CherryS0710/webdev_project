// models/CSDCanteen.js
const mongoose = require("mongoose");

const csdCanteenSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CSDCanteen = mongoose.model("CSDCanteen", csdCanteenSchema);

module.exports = CSDCanteen;
