// const express = require('express');
const user = require('../modules/UserModules');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => { 
    const { firstname, lastname, username, email, password } = req.body

    if(!firstname || !lastname || !username || !email || !password ) {
        return res.status(400).send("All fields are Required!");
    }

    try {
        const newUser = user({firstname, lastname, username, email, password});
        await newUser.save();
        res.status(200).json({ message: "Register Successfully", user: newUser });
        console.log("Register Succesfully");
    } catch (error) {
        res.status(400).send("Registration Failed!");
        console.log("Registration error",error);
    }
    
};

const LoginUSer = async (req, res) => {

    try{

        const { username, password } = req.body;
        const logUser = await user.findOne({ username });
        
        if(!username || !password) {
            return res.status(400).send("All fields are Required!");
        }

        if(!logUser) {
            return res.status(400).send("User Does not exits");
        }
        if( logUser.password !== password ) {
            console.log("user password", user.password);
            console.log("Entered password", password);
            return  res.status(400).send("Incorrect password");
        }
        
        // Generate jwt token
        const token = jwt.sign({ userId: logUser.id, email: logUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(token);
        res.status(200).json({ token, userId: logUser.id, message: "Login Successfull"});
    } catch (error) {
        res.status(400).send("Login Error");
        console.log("Login Failed",error);
    } 
};

const LogOutUser = async (req, res) => {
    const { token } = req.header;
    try {
        await localStorage.removeItem(token);
        res.status(200).json({
            message : 'LogOut Successfull',
        })
    } catch (err) {
        res.status(400).send("Loging out failed");
        console.log("Loging out failed",err);
    }
}

const GetUsers = async (req, res) => {
    try {
        const allUsers = await  user.find();
        const allUsersNumber = allUsers.length;
        res.status(200).json({message: 'all users route would be call', allUsersNumber, allUsers});
        console.log("User Route Called");
    } catch (err) {
        res.status(400).send("getting users failed");
        console.log("getting users failed",err);
    }
}

module.exports = { RegisterUser, LoginUSer, LogOutUser, GetUsers };