const express = require('express')
const router = express.Router();
const movieController = require('../controller/movieController');
router.route('/').post(movieController.createMovie).get(movieController.getMovies);
router.route('/:id').get(movieController.getMovie).patch(movieController.updateMovie).delete(movieController.deleteMovie);

module.exports = router;