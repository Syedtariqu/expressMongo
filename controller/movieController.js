const Movie = require('../model/moviesModel');
const CustomError = require('../util/customError');

exports.createMovie = async(req,res,next)=>{
  try{

    const movie = await Movie.create(req.body)
    res.status(201).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(error){
    // res.status(400).json({
    //     status: "Fail",
    //     msg: err.message
    // });
    const err = new CustomError(error.message,400);
    next(err);

  }
}
exports.getMovies = async (req, res,next) => {
  try {
    let query = Movie.find();

    // 1. Advanced Filtering
    if (req.query) {
      let filterFields = JSON.stringify(req.query);
      filterFields = filterFields.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);
      const queryObj = JSON.parse(filterFields);
      query = Movie.find(queryObj); // Apply filtering to the query
    }

    // 2. Sorting
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',').join(' ');
      query = query.sort(sortFields); // Apply sorting to the query
    }

    // 3. Field Limiting
    if (req.query.fields) {
      const limitFields = req.query.fields.split(',').join(' ');
      query = query.select(limitFields); // Limit fields in the result
    }

    // 4. Pagination (optional but often useful)
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit); // Pagination logic

    // Execute the query
    const movies = await query;

    res.status(200).json({
      status: "Success",
      length: movies.length,
      data: {
        movies
      }
    });

  } catch (error) {
    // res.status(400).json({
    //   status: "Fail",
    //   msg: err.message
    // });
    const err = new CustomError(error.message,400);
    next(err);
  }
};




exports.getMovie = async(req,res,next)=>{
  try{
 
  const {id} = req.params;
    const movie = await Movie.findById(id)
    res.status(200).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(error){
    // res.status(400).json({
    //     status: "Fail",
    //     msg: err.message
    // });
    const err = new CustomError(error.message,400);
    next(err);
  }
}
exports.updateMovie = async(req,res, next)=>{
  try{
  const {id} = req.params;

    const movie = await Movie.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status: "Success",
        data:{
            movie
        }
    });

  } catch(error){
    // res.status(400).json({
    //     status: "Fail",
    //     msg: err.message
    // });
    const err = new CustomError(error.message,400);
    next(err);
  }
}
exports.deleteMovie = async(req,res,next)=>{
  try{
  const {id} = req.params;

    await Movie.findByIdAndDelete(id)
    res.status(200).json({
        status: "Success",
        msg:"Movie Deleted successful"
    });

  } catch(error){
    // res.status(400).json({
    //     status: "Fail",
    //     msg: err.message
    // });
    const err = new CustomError(error.message,400);
    next(err);
  }
}

