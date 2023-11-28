const { Sequelize } = require("sequelize");
const globalConstants = require("../../const/globalConstants");

const sequelize = new Sequelize({
  username: globalConstants.DB_USER_NAME,
  password: globalConstants.DB_USER_PASSWORD,
  database: globalConstants.DB_NAME,
  host: globalConstants.DB_HOST || "127.0.0.1",
  dialect: globalConstants.DB_DIALECT,
  logging: false,
  define: {
    underscored: true,
  },
});

module.exports = sequelize;
