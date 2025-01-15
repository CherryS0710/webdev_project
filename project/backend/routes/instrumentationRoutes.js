// routes/instrumentationRoutes.js
const express = require("express");
const router = express.Router();
const Instrumentation = require("../models/Instrumentation");

// Get all instrumentation records
router.get("/", async (req, res) => {
  try {
    const instrumentationRecords = await Instrumentation.find();
    res.status(200).json(instrumentationRecords);
  } catch (error) {
    console.error("Error fetching instrumentation records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new instrumentation record
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    const newInstrumentation = new Instrumentation({ username, email, topic, details });
    await newInstrumentation.save();
    res.status(201).json(newInstrumentation);
  } catch (error) {
    console.error("Error saving instrumentation record:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;