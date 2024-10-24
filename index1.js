const express = require('express')
const app = express();
const mongoose = require('mongoose');
// const fs = require('fs')
// let movies = JSON.parse(fs.readFileSync('./data/movies.json'))
require('dotenv').config({path:'./config.env'})
app.use(express.json());
app.get('/api', (req, res) => {
    res.send("This is our home page");
})
// let DB_URL = "mongodb+srv://ayanhome:qSvbAY8ITd8ucdmq@cluster0.lkqih.mongodb.net/";

mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log("Database Connected");
    // console.log(conn)
}).catch((err)=>{
    console.log("Nah You can't")
})
// app.get('/api/about', (req, res) => {
//     res.send("This is our About us page");
// })
// // GET request
// app.get('/api/getMovies', (req, res) => {
//     let count = movies.length;
//     res.status(200).json({
//         status: "Success",
//         count,
//         movies
//     })
// })

// //GET request by route parameters

// app.get('/api/getMovieById/:id',(req,res)=>{
//     // console.log(req.params);
//     const searchId = +req.params.id;
//     const filteredMovie = movies.filter((movie)=>{
//         return movie.id === searchId;
//     })
// // console.log(filteredMovie)
//     res.status(200).json({
//         status:"Success",
//         data: filteredMovie
//     })
// })

// //POST  request

// app.post('/api/addMovie', (req, res) => {

//     let newMovie = req.body

//     //Add id
//     let newId = movies[movies.length - 1].id + 1;
//     newMovie.id = newId;
//     //console.log(newMovie); 
//     movies.push(newMovie);

//     fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//         res.status(201).json({
//             status: "Success",
//             msg: "Movie has been added",
//             NewMovie: newMovie
//         })
//     })


// })




// //UPDATE - PATCH 

// app.patch('/api/updateMovie/:id', (req, res) => {
//     let id = req.params.id;
//     let movieIndex = movies.findIndex(el => el.id === Number(id));

//     if (movieIndex !== -1) {
//         // Update the specific property (or properties) using the spread operator
//         movies[movieIndex] = {
//             ...movies[movieIndex],
//             ...req.body   // Spread the incoming update data into the existing movie object
//         };


//         // Update a specific property directly (e.g., update 'name' property)
//         // if (req.body.name) {
//         //     movieToUpdate.name = req.body.name;
//         // }



//          // Use Object.assign to update the properties in movieToUpdate
//         //  Object.assign(movieToUpdate, req.body);


//         // Write the updated data back to the file
//         fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//             if (err) {
//                 res.status(500).json({ status: "error", message: "Failed to update movie" });
//             } else {
//                 res.status(200).json({
//                     status: "success",
//                     data: movies[movieIndex]
//                 });
//             }
//         });
//     } else {
//         res.status(404).json({ status: "fail", message: "Movie not found" });
//     }
// });

let port = 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
