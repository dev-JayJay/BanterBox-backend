// Protected route
const express = require('express');
const router = express.Router()
const authenticateToken = require('../middleware/jwt');
const { GetUsers, LogOutUser } = require('../controllers/UserController');


router.get('/users', authenticateToken, GetUsers);
router.post('/logout', authenticateToken, LogOutUser);

module.exports = router;