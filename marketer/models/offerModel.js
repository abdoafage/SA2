// Import Sequelize and database configuration
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

// Define the Offer model
const Offer = sequelize.define(
  "Offer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    // freezeTableName:true,
  }
);

module.exports.Offer = Offer;
