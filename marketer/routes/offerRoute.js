const express = require("express");
const Offers = require("../controllers/offerController");
const router = express.Router();

router
  // .get("/", Offers.getAllOffers)
  .post("/create", Offers.createOffer)
  // .get("/:id", Offers.getOffersById)
  .delete("/delete/:id", Offers.deleteOffer);

module.exports = router;
