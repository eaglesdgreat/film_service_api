const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400)
    throw new Error('User Exists. Please login');
  }

  // encrypt user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  await delete user.password;

  if (user) {
    res.status(201).json({
      message: "Account created congratulations!!!",
      data: user,
      token: generateToken(user.id)
    });
  } else {
    res.status(400)
    throw new Error('Invalid user data.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    await delete user.password;
    
    res.status(200).json({
      message: "Welcome back!",
      data: user,
      token: generateToken(user.id)
    });
  } else {
    res.status(400)
    throw new Error('Invalid credentials');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
  res.status(200).json({ message: "successful", data: user });
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const { name, email, password, oldPassword } = req.body;

  const user = await User.findByPk(req.user.id);

  let hashedPassword = "";

  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }else {
    res.status(400)
    throw new Error('Password do not match');
  }

  user.set({
    name: name ? name : user.name,
    email: email ? email : user.email,
    password: hashedPassword,
  });

  await user.save();

  await delete user.password;

  res.status(200).json({
    message: "Updated successful",
    data: user
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserInfo,
}
