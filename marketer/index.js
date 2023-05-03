const express = require("express");
const app = express();
const usersRouter = require("./routes/offerRoute");
const { producer } = require("./config");

app.use(express.json());
app.use("/offers", usersRouter);

(async () => {
  await producer.connect();

  const msg = await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify({
          type: "TEST",
          data: "hello KafkaJS user! I am not trust myself it's amazing",
        }),
      },
    ],
  });
  console.log(msg);
})();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
