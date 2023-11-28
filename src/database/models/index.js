const { User } = require("./user.model");
const { Image } = require("./image.model");
const { ImageInUser } = require("./imageInUser.model");

const initModels = () => {
  User.belongsToMany(Image, { through: ImageInUser, as: "images" });
  Image.belongsToMany(User, { through: ImageInUser, as: "users" });
};

module.exports = { initModels };
