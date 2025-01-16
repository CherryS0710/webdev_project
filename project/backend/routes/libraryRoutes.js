// routes/libraryRoutes.js
const express = require("express");
const router = express.Router();
const Library = require("../models/Library");

// Get all library records
router.get("/", async (req, res) => {
  try {
    const libraryRecords = await Library.find();
    res.status(200).json(libraryRecords);
  } catch (error) {
    console.error("Error fetching library records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new library record
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    const newLibrary = new Library({ username, email, topic, details });
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (error) {
    console.error("Error saving library record:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
