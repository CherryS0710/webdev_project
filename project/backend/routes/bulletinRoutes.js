// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// Get all admin records
router.get("/", async (req, res) => {
  try {
    const adminRecords = await Admin.find();
    res.status(200).json(adminRecords);
  } catch (error) {
    console.error("Error fetching admin records:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new admin record
router.post("/", async (req, res) => {
  try {
    const { username, email, topic, details } = req.body;
    const newAdmin = new Admin({ username, email, topic, details });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error saving admin record:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
