const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Protected Route


// Sign-Up Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        // Create and save the user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error in signup route:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    console.log('Request Body:', req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        console.error('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found');
            return res.status(400).json({ message: 'User not found' });
        }
        console.log('User found:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Comparing passwords:', password, user.password);

        if (!isMatch) {
            console.error('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, token:', token);

        return res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error('Error in login route:', err.message);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});




module.exports = router;
