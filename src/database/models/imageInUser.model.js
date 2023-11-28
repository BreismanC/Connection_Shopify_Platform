const sequelize = require("../config/config");
const { DataTypes } = require("sequelize");

const ImageInUser = sequelize.define(
  "images_in_users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "image_id",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { ImageInUser };