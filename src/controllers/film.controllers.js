const asyncHandler = require('express-async-handler');
const { Film } = require('../models');

const getAllFilms = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "successful", data: await Film.findAll() });
});

const getFilmById = asyncHandler(async (req, res) => {
  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  res.status(200).json({ message: "successful", data: await Film.findByPk(req.params.id) });
});

const createFilm = asyncHandler(async (req, res) => {
  const { name, price, genre } = req.body;

  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  if (!name || !price || !genre) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const filmExist = await Film.findOne({ where: { name } });

  if (filmExist) {
    res.status(400)
    throw new Error('Film already Exists.');
  }

  const film = await Film.create({ name, price, genre });

  res.status(201).json({ message: "successful", data: film });
});

const updateFilm = asyncHandler(async (req, res) => {
  const { id, name, price, genre } = req.body;

  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  const film = await Film.findByPk(id);

  film.set({
    name: name ? name : film.name,
    price: price ? price : film.price,
    genre: genre ? genre : film.genre,
  })

  await film.save();

  res.status(200).json({ message: "successful", data: film });
});

const deleteFilm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  const film = await Film.findByPk(id);

  await film.destroy();

  res.status(200).json({ message: "deleted successful" });
});

module.exports = {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
}
