const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

// Handlerbars routers

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("products/list", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("products/list", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/new/form", (req, res) => {
  res.render("products/newProduct");
});

router.get("/edit/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    res.render("products/editProduct", product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/api/products/list");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// CRUD routers

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id/", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
