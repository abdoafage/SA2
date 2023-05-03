const express = require("express");
const { sequelize } = require("../config");
const { QueryTypes } = require("sequelize");
const { Offer, OFFER } = require("../models/offerModel");

module.exports.getAllOffers = async (req, res) => {
  const data = await Offer.findAll();
  console.log("All Offers : ", data);
  res.status(200).json(data);
};

// get
module.exports.getOffersById = async (req, res) => {
  const { id } = req.params;
  const data = await Offer.findByPk(id);

  console.log(`Offer id ${id} : `, data);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "id does not exist" });
  }
};

// create.
module.exports.createOffer = async (req, res) => {
  const data = req.body;
  console.log(data);

  const obj = new OFFER(data.name, data.discount);
  if (!obj.is_valid()) {
    res.status(400).json({ message: "unvalid structre" });
    return;
  }

  Offer.create(data);

  // task
  console.log("obj.get_values() ==> ", obj.get_values());

  console.log(msg);
  res.json({ data });
};

//update
module.exports.updateOffer = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const offer = await Offer.findByPk(id);

  const obj = new OFFER(data.name, data.discount);

  if (!obj.is_valid()) {
    res.status(400).json({ message: "id does not exist" });
    return;
  }

  await offer.update(data);

  // task
  console.log("obj.get_values() ==> ", obj.get_values());

  res.json({ data });
};

// delete
module.exports.deleteOffer = async (req, res) => {
  const { id: Id } = req.params;
  console.log(Id);
  const ret = await Offer.destroy({ where: { id: Id } });
  res.json({ ret });
};

// get all with select.
module.exports.getAllOffersWithSelect = async (req, res) => {
  const Offers = await sequelize.query("SELECT * FROM `Offers`", {
    type: QueryTypes.SELECT,
  });

  console.log("All Data with SELECT", Offers);

  res.json({ data: Offers });
};
