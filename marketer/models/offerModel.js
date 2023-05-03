// Import Sequelize and database configuration

class Offer {
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

module.exports.Offer = Offer;
