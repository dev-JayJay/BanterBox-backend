// Protected route
const express = require('express');
const router = express.Router()
const authenticateToken = require('../middleware/jwt');
const { GetUsers } = require('../controllers/UserController');


router.get('/users',authenticateToken, GetUsers);

module.exports = router;