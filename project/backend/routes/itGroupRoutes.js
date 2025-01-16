// routes/itGroupRoutes.js
const express = require("express");
const router = express.Router();
const ITGroup = require("../models/ITGroup");

// Get all IT Group records
router.get("/", async (req, res) => {
  try {
    const itGroupRecords = await ITGroup.find();
    res.status(200).json(itGroupRecords);
  } catch (error) {
    console.error("Error fetching IT Group records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new IT Group record
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    const newITGroup = new ITGroup({ username, email, topic, details });
    await newITGroup.save();
    res.status(201).json(newITGroup);
  } catch (error) {
    console.error("Error saving IT Group record:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;