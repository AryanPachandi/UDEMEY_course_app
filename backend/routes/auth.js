const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// const jwt_secret = "aryan";

const {userModel, courseModel, purchaseModel} = require("../db");
const {UserMiddleware} = require('../middleware/user.js');

const {JWT_USER_PASSWORD} =  require('../config');

router.use(express.json());


router.post('/Sign-up', async (req, res) => {
    const email = req.body.email
    const name = req.body.name;
    const password = req.body.password
    const role = req.body.role;

    try {
        await userModel.create({
            email,
            name,
            password,
            role,
        })
        res.json({
            msg:"u r signup successfully"
        })

    }catch(err) {
        console.log(err)
        res.status(400).json({
            msg: "Error",
        })
    }
})


router.post('/login', async (req, res) => {
    const {email, password ,role} = req.body;
    // const role = req.body.role;
    const user = await userModel.findOne({
        email: email,
        password: password,
        role: role,
    })
    if (user) {
        const token = jwt.sign({id: user._id.toString() ,user:user.role}, JWT_USER_PASSWORD, {expiresIn: '1h'} );
        res.json({token})
    }else{
        res.status(401).json({error: 'Unauthorized'})
    }
})
module.exports = {
    authRouter: router,
};