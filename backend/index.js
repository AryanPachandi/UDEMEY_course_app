const express = require('express');
const app = express();
const mongoose = require('mongoose');



const {userRouter} = require('./routes/user.js');
const {adminRouter} = require('./routes/admin.js');
const {courseRouter} = require('./routes/course.js');
const {authRouter} = require('./routes/auth.js');

require('dotenv').config();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", authRouter);

async function main() {

    await mongoose.connect(process.env.MONGO_URI, )
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));


    app.listen(3000);
    console.log("App is running");
}

main();
