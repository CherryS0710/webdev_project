// routes/financeRoutes.js
const express = require("express");
const router = express.Router();
const Finance = require("../models/Finance");

// Get all finance records
router.get("/", async (req, res) => {
  try {
    const finances = await Finance.find();
    res.status(200).json(finances);
  } catch (error) {
    console.error("Error fetching finance records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new finance record
router.post("/", async (req, res) => {
    try {
      const { username, email, topic, description } = req.body;
      if (!description) {
        throw new Error("Description is required");
      }
      const newFinance = new Finance({ username, email, topic, description });
      await newFinance.save();
      res.status(201).json(newFinance);
    } catch (error) {
      console.error("Error saving finance record:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  
module.exports = router;
