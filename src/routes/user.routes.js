const express = require("express");
const { UserController } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes
  .route("/")
  .post(UserController.postUser)
  .get(UserController.getAllUsers);

userRoutes
  .route("/:id")
  .put(UserController.putUser)
  .get(UserController.getUserById)
  .delete(UserController.deleteUser);

module.exports = { userRoutes };
