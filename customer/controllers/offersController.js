const express = require("express");
const { sequelize } = require("../config");
const { QueryTypes } = require("sequelize");
const { Offer } = require("../models/offerModel");

module.exports.getAllOffers = async (req, res) => {
  // res.json({ hello: "world" });
  const data = await Offer.findAll();
  // console.log(data);
  res.status(200).json(data);
  // if (data) {
  //   res.status(200).json(data);
  // } else {
  //   res.status(500).json({ message: "error" });
  // }
};

module.exports.getOffersById = async (req, res) => {
  const { id } = req.params;
  const data = await Offer.findByPk(id);

  // console.log(data);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ message: "error" });
  }
  // res.json({ hello: req.params.id });
};

module.exports.getAllOffersWithSelect = async (req, res) => {
  const users = await sequelize.query("SELECT * FROM `Offers`", {
    type: QueryTypes.SELECT,
  });

  // console.log(users);

  res.json({ data: users });
};

// module.exports.getAllOffers = (req, res) => {
//     //
// };
