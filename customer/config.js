const { Sequelize } = require("sequelize");
const { Kafka } = require("kafkajs");
// const { now } = require("sequelize/types/utils");

// ================================================== kafka config ====================================

// const kafka = new Kafka({
//   clientId: "myApp",
//   brokers: [process.env.KAFKA_HOST],
// });

// const consumer = kafka.consumer({ groupId: "group-test" });

// ================================================== db config ====================================

const sequelize = new Sequelize("my_db", "root", "example", {
  host: "db",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
sequelize.sync();

module.exports = { sequelize };
