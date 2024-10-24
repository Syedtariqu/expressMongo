const Movie = require('../model/moviesModel')

exports.createMovie = async(req,res)=>{
  try{

    const movie = await Movie.create(req.body)
    res.status(201).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(err){
    res.status(400).json({
        status: "Fail",
        msg: err.message
    });

  }
}
exports.getMovies = async(req,res)=>{
  try{

    //For all movies 
    // const movies = await Movie.find()

    //Filtering  movies according to the query string
    // const movies = await Movie.find(queryObj); //it will work properly 
  

     //Advance Filtering 
    // console.log(req.query);
    // let filterFields = JSON.stringify(req.query);
    // filterFields =  filterFields.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`)
    // const queryObj = JSON.parse(filterFields);
    // console.log(queryObj)
  //  const movies = await Movie.find(queryObj); //it will work properly 



  //sorting feature
//  console.log(req.query);
// if(req.query.sort){
// let query = Movie.find();
// // query = query.sort(req.query.sort);

// //too many values to sort 
// let sortFields = req.query.sort.split(',').join(" ");
// query = query.sort(sortFields);

// }



//Limited Field 
let query = Movie.find();

// Limiting the fields to be returned
if (req.query.fields) {
  let limitField = req.query.fields.split(',').join(' ');
  query = query.select(limitField);
}
const movies = await query;
    res.status(200).json({
        status: "Success",
        length: movies.length,
        data:{
            movies
        }
    });

  } catch(err){
    res.status(400).json({
        status: "Fail",
        msg: err.message
    });

  }
}



exports.getMovie = async(req,res)=>{
  try{
 
  const {id} = req.params;
    const movie = await Movie.findById(id)
    res.status(200).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(err){
    res.status(400).json({
        status: "Fail",
        msg: err.message
    });

  }
}
exports.updateMovie = async(req,res)=>{
  try{
  const {id} = req.params;

    const movie = await Movie.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(err){
    res.status(400).json({
        status: "Fail",
        msg: err.message
    });

  }
}
exports.deleteMovie = async(req,res)=>{
  try{
  const {id} = req.params;

    await Movie.findByIdAndDelete(id)
    res.status(200).json({
        status: "Success",
        msg:"Movie Deleted successful"
    });

  } catch(err){
    res.status(400).json({
        status: "Fail",
        msg: err.message
    });

  }
}

