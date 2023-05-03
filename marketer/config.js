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

// const kafka = require("node-rdkafka");
// kafka producer.
// const producer = new kafka.Producer({
//   "client.id": "kafka",
//   "metadata.broker.list": "localhost:9092",
//   //   dr_cb: true,
// });

// producer.connect();

// producer.on("ready", function () {
//   console.log("################## producer is ready #################");

//   // Create an admin client
//   // const client = new kafka.AdminClient.create({
//   //   // "client.id": "kafka2",
//   //   "metadata.broker.list": "localhost:9092",
//   // });

//   // List all topics
//   producer.getMetadata(

//   );
//   client.disconnect();

//   // try {
//   //   producer.produce(
//   //     "OfferTopic",
//   //     0,
//   //     Buffer.from("Awesome message from me ^_^")
//   //     //   "Stormwind",
//   //     //   Date.now()
//   //   );
//   // } catch (error) {
//   //   console.log(err);
//   // }
// });

// producer.on("event.error", function (err) {
//   console.error("Error from producer");
//   console.error(err);
// });

// const sequelize = new Sequelize("my_db", "root", "example", {
//   host: "db",
//   dialect: "mysql",
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// sequelize.sync();

module.exports = { producer };
