const express = require("express");
const app = express();
const usersRouter = require("./routes/offerRoute");
require("./config");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });
// sequelize.sync();
app.use(express.json());
app.use("/offers", usersRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
