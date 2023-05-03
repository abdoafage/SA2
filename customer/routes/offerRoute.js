const express = require("express");
const Offers = require("../controllers/offersController");
const router = express.Router();

router
  .get("/", Offers.getAllOffers)
  .get("/getWithSelect", Offers.getAllOffersWithSelect)
  .post("/create", Offers.createOffer)
  .delete("/delete/:id", Offers.deleteOffer)
  .put("/update/:id", Offers.updateOffer)
  .get("/:id", Offers.getOffersById);

module.exports = router;
