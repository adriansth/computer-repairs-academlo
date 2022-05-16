const express = require("express");
const { body } = require("express-validator");

// Middlewares
const {
  userExists,
  protectToken,
  protectAdmin,
  protectAccountOwner,
} = require("../middlewares/users.middlewares");
const {
  createUserValidations,
  checkValidations,
} = require("../middlewares/validations.middlewares");

// Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require("../controllers/user.controller");

const router = express.Router();

router.post(
    '/',
    createUserValidations,
    checkValidations,
    createUser
  );

router.post('/login', login);

// Apply protect token middleware
router.use(protectToken);

router.get("/", protectAdmin, getAllUsers);

router.get("/check-token", checkToken);

router
    .route("/:id")
    .get(protectAdmin, userExists, getUserById)
    .patch(userExists, protectAccountOwner, updateUser)
    .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { userRouter: router };
