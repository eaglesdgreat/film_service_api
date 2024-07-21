const express = require('express');
const { protect } = require('../middlewares/auth.middleware')
const {
  purchaseFilm,
  userPurchaseHistory
} = require('../controllers/purchase.controllers')

const router = express.Router();

router.post('/add', protect, purchaseFilm);
router.get('/users/history', protect, userPurchaseHistory);

module.exports = router;
