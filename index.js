const express = require('express')
const app = express();
const mongoose = require('mongoose');
const movieRoutes = require('./router/movieRoutes')
const userRouters = require('./router/userRouters')
const CustomError = require('./util/customError');
require('dotenv').config({path:'./config.env'})
app.use(express.json());
app.use('/api/v1',movieRoutes)
app.use('/api/v1',userRouters)

//Create default router function
app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't fount the route ${req.originalUrl} in the server`
    // });

    // Here we initiate the error object and passed it through the next() methods ao it will call the global error handling method automatically

    // const err = new Error(`Can't fount the route ${req.originalUrl} in the server`);
    // err.statusCode = 404;
    // err.status = "fail";
    const err = new CustomError(`Can't fount the route ${req.originalUrl} in the server`,404);
    next(err);

})

// Global error handling function

app.use((error, req, res, next)=>{
    error.statusCode = error.statusCode || 500;
res.status(error.statusCode).json({
        status: error.status,
        message: error.message
})
})

mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("What is this Brother ! ")
})


let port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})