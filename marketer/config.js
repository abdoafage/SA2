// const { Sequelize } = require("sequelize");
// const { now } = require("sequelize/types/utils");

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "myApp",
  brokers: [process.env.KAFKA_HOST],
  retry: {
    maxRetryTime: 60000,
    retries: 30,
  },
});

const producer = kafka.producer();

module.exports = { producer };
