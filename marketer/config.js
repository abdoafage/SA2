const { Sequelize } = require("sequelize");
// const { now } = require("sequelize/types/utils");
const kafka = require("node-rdkafka");
// kafka producer.
const producer = new kafka.Producer({
  //   "client.id": "kafka",
  "metadata.broker.list": "localhost:9092",
  //   dr_cb: true,
});

producer.connect();

producer.on("ready", function () {
  console.log("################## producer is ready #################");
  // try {
  //   producer.produce(
  //     "OfferTopic",
  //     0,
  //     Buffer.from("Awesome message from me ^_^")
  //     //   "Stormwind",
  //     //   Date.now()
  //   );
  // } catch (error) {
  //   console.log(err);
  // }
});

producer.on("event.error", function (err) {
  console.error("Error from producer");
  console.error(err);
});

const sequelize = new Sequelize("my_db", "root", "example", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize, producer };
