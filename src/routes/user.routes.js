const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserInfo
} = require('../controllers/user.controllers');
const { protect } = require('../middlewares/auth.middleware')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/session', protect, getCurrentUser);
router.put('/update', protect, updateUserInfo);

module.exports = router;
