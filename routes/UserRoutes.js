const express = require('express');
const router = express.Router()
const { RegisterUser, LoginUSer, getUsers } = require('../controllers/UserController');

router.post('/register', RegisterUser);
router.post('/login', LoginUSer);


module.exports = router;