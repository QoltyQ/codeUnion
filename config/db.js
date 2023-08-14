const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("codeunion", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = sequelize;
