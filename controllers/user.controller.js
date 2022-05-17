const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

// Middlewares
const { protectAccountOwner } = require('../middlewares/users.middlewares');

dotenv.config({ path: './config.env' });

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      users
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with given id'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({
      newUser
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with given id'
      });
    }
    await user.update({ name, email });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with given id'
      });
    }
    await user.update({ status: 'deleted' });
  } catch (err) {
    console.log(err);
  }
};

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // Validate that the user exists with the given email
  const user = await User.findOne({
    where: { email, status: 'active' }
  });
  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }
  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  user.password = undefined;
  res.status(200).json({ token, user });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken
};
