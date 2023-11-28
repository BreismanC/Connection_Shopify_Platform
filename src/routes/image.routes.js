const express = require("express");
const imageRoutes = express.Router();
const { ImageController } = require("../controllers/image.controller");

imageRoutes.route("/").post(ImageController.postImage);

module.exports = { imageRoutes };