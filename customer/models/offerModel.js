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

class OFFER {
  constructor(name, discount) {
    this.name = name;
    this.discount = discount;
  }
  is_valid() {
    const d = parseFloat(this.discount) && parseInt(this.discount);
    const n = this.name;
    if (d == null || n == null) {
      return false;
    }
    return true;
  }
  get_values() {
    return { name: this.name, discount: this.discount };
  }
}

module.exports = { Offer, OFFER };
