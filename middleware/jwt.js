const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthorizationToken = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = AuthorizationToken;
