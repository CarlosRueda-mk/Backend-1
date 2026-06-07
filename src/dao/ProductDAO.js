const Product = require("../models/Product.js");

class ProductDAO {
  async getAll(filter = {}, options = {}) {
    return await Product.find(filter)
      .sort(options.sort || {})
      .skip(options.skip || 0)
      .limit(options.limit || 0);
  }
  async countDocuments(filter = {}) {
    return await Product.countDocuments(filter);
  }
  async getById(id) {
    return await Product.findById(id);
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductDAO();
