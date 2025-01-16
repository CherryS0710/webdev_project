// routes/csdCanteenRoutes.js
const express = require("express");
const router = express.Router();
const CSDCanteen = require("../models/CSDCanteen");

// Get all CSD Canteen updates
router.get("/", async (req, res) => {
  try {
    const csdCanteenUpdates = await CSDCanteen.find();
    res.status(200).json(csdCanteenUpdates);
  } catch (error) {
    console.error("Error fetching CSD Canteen updates:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new CSD Canteen update
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    console.log("Received data:", { username, email, topic, details });
    const newCSDCanteen = new CSDCanteen({ username, email, topic, details });
    await newCSDCanteen.save();
    res.status(201).json(newCSDCanteen);
  } catch (error) {
    console.error("Error saving CSD Canteen update:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
