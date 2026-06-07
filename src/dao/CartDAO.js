const Cart = require("../models/Cart.js");

class CartDAO {
  async create() {
    return await Cart.create({ products: [] });
  }

  async getById(id) {
    return await Cart.findById(id);
  }

  async save(cart) {
    return await cart.save();
  }
}

module.exports = new CartDAO();
