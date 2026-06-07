const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("products/list", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) {
      return res.status(404).json({ message: "product no found" });
    }

    res.render("products/productDetail", product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
