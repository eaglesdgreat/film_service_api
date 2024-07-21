const express = require('express');
const { protect } = require('../middlewares/auth.middleware')
const {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
} = require('../controllers/film.controllers');

const router = express.Router();

router.get('/', protect, getAllFilms)
router.get('/:id', protect, getFilmById)
router.post('/create', protect, createFilm)
router.put('/update', protect, updateFilm)
router.delete('/delete/:id', protect, deleteFilm)

module.exports = router;
