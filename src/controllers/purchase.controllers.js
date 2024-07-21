const asyncHandler = require('express-async-handler');
const { Purchase, Film, User } = require('../models');

const purchaseFilm = asyncHandler(async (req, res) => {
  const { amount_paid, filmId } = req.body;

  if (!amount_paid || !filmId) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const film = await Film.findByPk(filmId)

  if (!film) {
    res.status(400)
    throw new Error('Film does not exist in record!');
  }

  if (film && film.price > amount_paid) {
    res.status(400)
    throw new Error(`Enter correct amount of ${film.price}`);
  }

  const where = {
    filmId,
    userId: req.user.id
  }

  if (await Purchase.findOne( { where })) {
    res.status(400)
    throw new Error('You hav already purchased this film.');
  }

  const purchase = await Purchase.create({
    amount_paid,
    filmId,
    userId: req.user.id,
  });

  res.status(200).json({ message: "Purchase item successful", data: purchase });
})

const userPurchaseHistory = asyncHandler(async (req, res) => {
  const purchaseHistory = await Purchase.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        as: "user"
      },
      {
        model: Film,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        as: "film"
      }
    ]
  });

  res.status(200).json({ message: "successful", data: purchaseHistory });
})

module.exports = {
  purchaseFilm,
  userPurchaseHistory
}
