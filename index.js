const express = require('express')
const app = express();
const mongoose = require('mongoose');
const movieRoutes = require('./router/movieRoutes')
require('dotenv').config({path:'./config.env'})
app.use(express.json());

app.use('/api/v1',movieRoutes)
mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("What is this Brother ! ")
})


let port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})