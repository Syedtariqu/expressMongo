const express = require('express')
const app = express();
const mongoose = require('mongoose');
const movieRoutes = require('./router/movieRoutes')
require('dotenv').config({path:'./config.env'})
app.use(express.json());
// app.get('/api/v1', (req, res) => {
//     res.send("This is our home page");
// })
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
