// const express = require("express");
// const kafka = require("node-rdkafka");
const { producer } = require("../config");
const { Offer } = require("../models/offerModel");

module.exports.getAllOffers = (req, res) => {
  res.json({ hello: "world" });
};

module.exports.getOffersById = (req, res) => {
  res.json({ hello: req.params.id });
};

module.exports.createOffer = async (req, res) => {
  const data = { type: "POST", data: req.body };
  console.log(data);

  const obj = new Offer(data.data.name, data.data.discount);
  if (!obj.is_valid()) {
    res.status(400).json({ message: "unvalid structre" });
    return;
  }
  // task
  console.log("obj.get_values() ==> ", obj.get_values());

  const msg = await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(data) }],
  });

  console.log(msg);
  res.json({ data });
};

module.exports.deleteOffer = async (req, res) => {
  const data = { type: "DELETE", data: { id: req.params.id } };
  console.log(data);

  const msg = await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(data) }],
  });

  console.log(msg);
  res.json({ data });
};
