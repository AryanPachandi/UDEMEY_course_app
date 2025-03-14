const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {userSchema, courseSchema, purchaseSchema} = require('../db.js');
const {AdminMiddleware} = require('../middleware/admin');

const JWT_ADMIN_PASSWORD =  require('../config');

router.use(express.json());

router.post('/new-courses', AdminMiddleware, async (req, res) => {
    const AdminID = req.AdminID;

    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const price = req.body.price;

   const course =  await courseSchema.create({
        name: name,
        title: title,
        description: description,
        imageURL: imageURL,
        price: price,
        AdminID: AdminID,
    });

    res.status(200).json({
        msg: 'Successfully created new course',
        course : course._id,
    })
})

router.put('/update-course/:id', AdminMiddleware, async (req, res) => {
    const AdminID = req.AdminID;
    const courseId = req.params.id;

    const { title, description, imageURL, price } = req.body;

    const response  = await courseSchema.updateOne(
        {    _id: courseId,
            creatorId: AdminID,
        },
        {
            title: title,
            description: description,
            imageURL: imageURL,
            price: price,
        }
    )
    res.status(200).json({
        msg: 'Successfully updated course',
    })
})

router.delete('/course/bulk', AdminMiddleware, async (req, res) => {
    const AdminID = req.AdminID;
    // const courseId = req.params.id;
  const response = await courseSchema.find({creatorId: AdminID});
  res.status(200).json({
      course : response,
      msg: 'course updted successfully',
  })
})

module.exports = {
    adminRouter: router,
}