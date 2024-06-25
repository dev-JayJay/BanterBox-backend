// const express = require('express');
const user = require('../modules/UserModules');

const RegisterUser = (req, res) => { 
    const { name, username, gender, password } = req.body

    try {
        const newUser = user({name, username, gender, password});
        newUser.save();
        res.status(200).json({ message: "Register Successfully", user: newUser });
        console.log("Register Succesfully");
    } catch (error) {
        res.status(400).send("Registration Failed!");
        console.log("Registration error",error);
    }
    
};

const LoginUSer = (req, res) => {
    res.send("Login Route Called");
    console.log();("Login Route Called");
};

module.exports = { RegisterUser, LoginUSer };