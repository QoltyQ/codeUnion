const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Currency = sequelize.define("currency", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
});

module.exports = Currency;
