const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_PHASE); // Replace with your JWT secret key
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
