const express = require("express");
const User = require("../models/User"); // Import the User model

const router = express.Router();

// Get User Details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password"); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // Log error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;