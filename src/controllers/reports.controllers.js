const asyncHandler = require('express-async-handler');
const { Film, Purchase, sequelize } = require('../models');

const getAllActionGenreFilms = asyncHandler(async (req, res) => {
  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  const actionGenreFilms = await Film.findAll({ where: { genre: 'Action' } })

  res.status(200).json({ message: "successful", data: actionGenreFilms });
});

const totalNumberOfFilmsPurchased = asyncHandler(async (req, res) => {
  if (req.user.role !== "Admin") {
    res.status(403)
    throw new Error('Unauthorized. Permission denial!');
  }

  const totalNumberPurchased = await Purchase.findAll({ attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]] })

  res.status(200).json({ message: "successful", data: totalNumberPurchased[0] });
});

module.exports = {
  getAllActionGenreFilms,
  totalNumberOfFilmsPurchased,
}
