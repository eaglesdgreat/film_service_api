const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const {
  getAllActionGenreFilms,
  totalNumberOfFilmsPurchased
} = require('../controllers/reports.controllers');

const router = express.Router();

router.get('/genre/action', protect, getAllActionGenreFilms)
router.get('/total/purchases', protect, totalNumberOfFilmsPurchased)

module.exports = router;
