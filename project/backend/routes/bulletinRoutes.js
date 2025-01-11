const express = require("express");
const Bulletin = require("../models/bulletin");

const router = express.Router();

// Create a new bulletin update
router.post("/", async (req, res) => {
  try {
    const { section, topic, details } = req.body;
    console.log("Received data:", { section, topic, details }); // Log received data
    const newBulletin = new Bulletin({ section, topic, details });
    await newBulletin.save();
    res.status(201).json(newBulletin);
  } catch (error) {
    console.error("Error saving bulletin:", error); // Log error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get all bulletin updates
router.get("/", async (req, res) => {
  try {
    const bulletins = await Bulletin.find();
    res.status(200).json(bulletins);
  } catch (error) {
    console.error("Error fetching bulletins:", error); // Log error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;