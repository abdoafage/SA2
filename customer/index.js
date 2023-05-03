const express = require("express");
const app = express();
const offerRouter = require("./routes/offerRoute");
const { sequelize } = require("./config");
// const kafka = require("node-rdkafka");
const { Kafka } = require("kafkajs");
const { Offer } = require("./models/offerModel");
app.use(express.json());

// ================================== kafka configuration =================================

const kafka = new Kafka({
  clientId: "myApp",
  brokers: [process.env.KAFKA_HOST],
  retry: {
    maxRetryTime: 60000,
    retries: 30,
  },
});

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

async function start() {
  const consumer = kafka.consumer({ groupId: "group-test" });

  await consumer.connect();

  consumer.on("consumer.connect", (data) => {
    console.log(
      "###################### consumer is ready ######################"
    );
  });

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: true,
  });

  // await consumer.run({
  //   eachMessage: async (data) => {
  //     console.log(data);
  //   },
  // });

  await consumer.run({
    eachMessage: async (DATA) => {
      console.log(DATA);
      console.log(DATA.message.value.toString());

      const retData = JSON.parse(DATA.message.value.toString());
      console.log(retData);

      if (retData["type"] == "POST") {
        Offer.create(retData["data"]);

        // console.log("POST");
      } else if (retData["type"] == "DELETE") {
        const Id = parseInt(retData["data"].id);
        await Offer.destroy({ where: { id: Id } });

        // console.log("DELETE");
      } else {
        console.log("invalid data sent to consumer");
      }
    },
  });
}

start().catch((e) => console.log(e));

// ================================== db configuration =================================

// ================================== nodejs server =================================
app.use("/offers", offerRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
