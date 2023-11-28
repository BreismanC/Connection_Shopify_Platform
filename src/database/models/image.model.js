const sequelize = require("../config/config");
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: "id",
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "src",
    },
    awsAccessKey: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "aws_access_key",
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "original_name",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Image };
