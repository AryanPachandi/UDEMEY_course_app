const mongoose = require('mongoose');

const Schema =mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    name :{type: String, required: true},
    email :{type: String, required: true , unique:true},
    password: {type: String, required: true},
    role : {type: String, required: true , enum: ['admin', 'user']},
})

const courseSchema = new Schema({
    name : {type: String, required: true},
    title : {type: String, required: true},
    description : {type: String, required: true},
    imageURL : {type: String, required: true},
    price : {type: Number, required: true},
    AdminID : {type: mongoose.Types.ObjectId , ref :'User', required: true},
})
const purchaseSchema = new Schema({
  UserID : {type: mongoose.Types.ObjectId,ref:'User' ,  required: true},
    courseID : {type: mongoose.Types.ObjectId,ref: 'Course' ,required: true},
})

const userModel = mongoose.model("User", userSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
   userModel: userModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel,

}
