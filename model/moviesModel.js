const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field Is required"],
        unique: true
    },
    descriptions: {
        type: String,
        required: [true, "Description Field Is required"],
    },
    rating: {
        type: Number,
        default: 0
    },
    duration:{
        type:Number,
        required: [true, "Duration Field Is required"],
    }
});


const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;