const express = require("express");
const Offers = require("../controllers/offersController");
const router = express.Router();

router
  .get("/", Offers.getAllOffers)
  .get("/getWithSelect", Offers.getAllOffersWithSelect)
  .get("/:id", Offers.getOffersById);

module.exports = router;
