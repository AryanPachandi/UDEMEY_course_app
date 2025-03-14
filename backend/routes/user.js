const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const jwt_secret = "aryan";

const {userModel, courseModel, purchaseModel} = require("../db");
const {UserMiddleware} = require('../middleware/user.js');

const {JWT_USER_PASSWORD} =  require('../config');

router.use(express.json());

router.get('/purchase',UserMiddleware, async (req, res) => {
    const UserID=req.UserID;

    const purchases = await purchaseModel.find({ userId }).populate("userId").populate("courseId");
    res.json({purchases});
})
module.exports = {
    userRouter: router,
}