const express = require('express');
const router = express.Router()
const { RegisterUser, LoginUSer, } = require('../controllers/UserController');

router.post('/register', RegisterUser);
router.get('/login', LoginUSer);

module.exports = router;