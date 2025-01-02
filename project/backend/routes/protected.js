const express = require('express');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// Protected Route Example
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user with ID: ${req.user.id}` });
});

module.exports = router;
