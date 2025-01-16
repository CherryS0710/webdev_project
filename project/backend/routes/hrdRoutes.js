// routes/hrdRoutes.js
const express = require("express");
const router = express.Router();
const HRD = require("../models/HRD");

// Get all HRD records
router.get("/", async (req, res) => {
  try {
    const hrdRecords = await HRD.find();
    res.status(200).json(hrdRecords);
  } catch (error) {
    console.error("Error fetching HRD records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new HRD record
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    const newHRD = new HRD({ username, email, topic, details });
    await newHRD.save();
    res.status(201).json(newHRD);
  } catch (error) {
    console.error("Error saving HRD record:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
