const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        console.error('No token provided');
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ message: 'Invalid Token', error: error.message });
    }
};

module.exports = authenticateToken;
