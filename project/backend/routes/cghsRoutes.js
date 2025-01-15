// routes/cghsRoutes.js
const express = require("express");
const router = express.Router();
const CGHS = require("../models/CGHS");

// Get all CGHS updates
router.get("/", async (req, res) => {
  try {
    const cghsUpdates = await CGHS.find();
    res.status(200).json(cghsUpdates);
  } catch (error) {
    console.error("Error fetching CGHS updates:", error); // Log error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new CGHS update
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    console.log("Received data:", { username, email, topic, details }); // Log received data
    const newCGHS = new CGHS({ username, email, topic, details });
    await newCGHS.save();
    res.status(201).json(newCGHS);
  } catch (error) {
    console.error("Error saving CGHS update:", error); // Log error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;