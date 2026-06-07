const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.js");

const {
  createCart,
  getCartById,
  addProductToCart,
  clearCart,
  removeProduct,
  updateCart,
  updateCartQuantity,
} = require("../controllers/cartController.js");

router.get("/view/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product")
      .lean();
    res.render("carts/cartDetail", { cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", createCart);

router.get("/:cid", getCartById);

router.post("/:cid/products/:pid", addProductToCart);
router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateCartQuantity);
router.delete("/:cid", clearCart);
router.delete("/:cid/products/:pid", removeProduct);

module.exports = router;
