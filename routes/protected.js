// Protected route
const express = require('express');
const router = express.Router()
const AuthorizationToken = require('../middleware/jwt');
const { GetUsers, LogOutUser } = require('../controllers/UserController');
const { SendMessage, GetMessage } = require('../controllers/MessageController');

// protected route to authorize and log out users
router.get('/users', AuthorizationToken, GetUsers);
router.post('/logout', AuthorizationToken, LogOutUser);

// protected message route
router.post('/send', AuthorizationToken, SendMessage);
router.get('/send', AuthorizationToken, GetMessage);

module.exports = router;