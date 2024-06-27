// const express = require('express');
const user = require('../modules/UserModules');

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
        // pass jwt token and perform authorization
        res.status(200).json({ message: "Login Successfull"});
    } catch (error) {
        res.status(400).send("Login Error");
        console.log("Login Failed",error);
    } 
};

const GetUsers = async (req, res) => {
    res.status(200).send('all users route would be call');
    console.log("User Route Called");
}

module.exports = { RegisterUser, LoginUSer, GetUsers };