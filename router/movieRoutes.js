const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');
const userController = require('../controller/usersController');

// Protect the routes to only allow access to authorized users
router.route('/movies')
  .post(userController.protected, movieController.createMovie) // Protects the createMovie route
  .get(userController.protected, movieController.getMovies); // Protects the getMovies route

router.route('/movies/:id')
  .get(userController.protected, movieController.getMovie) // Protects the getMovie route for a specific ID
  .patch(userController.protected, movieController.updateMovie) // Protects the updateMovie route for a specific ID
  .delete(userController.protected, movieController.deleteMovie); // Protects the deleteMovie route for a specific ID

module.exports = router;
