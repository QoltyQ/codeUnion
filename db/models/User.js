const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
