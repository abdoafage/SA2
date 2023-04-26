// const express = require("express");
// const kafka = require("node-rdkafka");
const { producer } = require("../config");

module.exports.getAllOffers = (req, res) => {
  res.json({ hello: "world" });
};

module.exports.getOffersById = (req, res) => {
  res.json({ hello: req.params.id });
};

module.exports.createOffer = (req, res) => {
  const data = { type: "POST", data: req.body };
  console.log(data);
  producer.produce(
    "OfferTopic",
    0,
    Buffer.from(JSON.stringify(data))
    //   "Stormwind",
    //   Date.now()
  );
  res.json({ data });
};

module.exports.deleteOffer = (req, res) => {
  const data = { type: "DELETE", data: { id: req.params.id } };
  console.log(data);
  producer.produce(
    "OfferTopic",
    0,
    Buffer.from(JSON.stringify(data))
    //   "Stormwind",
    //   Date.now()
  );
  res.json({ data });
};
