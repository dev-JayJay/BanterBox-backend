const express = require('express');
const router = express.Router()
const { RegisterUser, LoginUSer, LogOutUser, getUsers } = require('../controllers/UserController');

router.post('/register', RegisterUser);
router.post('/login', LoginUSer);
// router.post('/logout', LogOutUser);


module.exports = router;