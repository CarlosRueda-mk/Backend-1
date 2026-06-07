const cartDAO = require("../dao/CartDAO.js");

const createCart = async (req, res) => {
  try {
    const cart = await cartDAO.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: " Cart no found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.pid,
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    await cart.save();
    res.redirect(`/api/carts/view/${cart._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: " cart no found" });
    }
    cart.products = req.body.products;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: "cart no found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.pid,
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = req.body.quantity;
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    cart.products = [];
    await cart.save();
    res.redirect(`/api/carts/view/${cart._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.pid,
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.redirect(`/api/carts/view/${cart._id}`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  clearCart,
  removeProduct,
  updateCart,
  updateCartQuantity,
};
