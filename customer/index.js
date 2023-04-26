const express = require("express");
const app = express();
const offerRouter = require("./routes/offerRoute");
const { sequelize } = require("./config");
const kafka = require("node-rdkafka");
const { Offer } = require("./models/offerModel");
app.use(express.json());

const consumer = new kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

async function createData(data) {
  Offer.create(data);
  console.log(data);
}
async function deleteDAta(data) {
  // try {
  // const offer = await Offer.findByPk(data.id);
  // await offer.destroy();
  const Id = parseInt(data.id);
  await Offer.destroy({ where: { id: Id } });
  console.log(data);
  // } catch (error) {
  // console.log(error);
  // }
}

consumer.connect();

consumer
  .on("ready", () => {
    console.log("################## consumer is ready #################");
    consumer.subscribe(["OfferTopic"]);
    consumer.consume();
  })
  .on("data", (data) => {
    console.log(`received message:`);
    console.log(data);
    const retData = JSON.parse(data.value.toString());
    console.log(retData);
    if (retData["type"] == "POST") {
      createData(retData["data"]);
    } else if (retData["type"] == "DELETE") {
      deleteDAta(retData["data"]);
    } else {
      console.log("invalid data sent to consumer");
    }
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

app.use("/offers", offerRouter);

//
// kafka consumer.
//

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
