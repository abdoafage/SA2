const { Sequelize } = require("sequelize");
// const { now } = require("sequelize/types/utils");

const sequelize = new Sequelize("my_db", "root", "example", {
  host: "localhost",
  dialect: "mysql",
});

module.exports.sequelize = sequelize;
