const sequelize = require("../config/config");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lastname",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { User };
