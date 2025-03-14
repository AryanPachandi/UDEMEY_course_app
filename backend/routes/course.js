const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {userSchema, courseSchema, purchaseSchema} = require('../db.js');
const {UserMiddleware} = require('../middleware/user.js');

const JWT_USER_PASSWORD =  require('../config');

router.use(express.json());

router.post('/purchase-course-user', UserMiddleware,async (req, res) => {

    const userID = req.UserID;
    const courseID = req.body.courseID;

    const course_product = await cou
    rseSchema.find({courseID: courseID});

    if (!course_product) {


        res.status(401).send({
            message: 'Course not found',
        })
    }
    const price = course_product.price;


    await purchaseSchema.create({
        courseID: courseID,
        price: price,
        course_product_id: course_product.id,
    })

    res.status(200).json({
        message: 'Course purchased successfully',
    })
})

router.get('/preview', UserMiddleware,async (req, res) => {
const course = await courseSchema.find({})
    res.json({
        course: course,
    })
})

module.exports = {
    courseRouter: router,
}