const productDAO = require("../dao/productDAO.js");

const getProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    let sortOption = {};
    if (req.query.sort === "asc") {
      sortOption.price = 1;
    }
    if (req.query.sort === "desc") {
      sortOption.price = -1;
    }

    const products = await productDAO.getAll(filter, {
      sort: sortOption,
      skip,
      limit,
    });

    const totalProducts = await productDAO.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const prevLink = hasPrevPage
      ? `/api/products?page=${prevPage}&limit=${limit}`
      : null;

    const nextLink = hasNextPage
      ? `/api/products?page=${nextPage}&limit=${limit}`
      : null;

    res.status(200).json({
      status: "success",
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.code ||
      !req.body.price
    ) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const product = await productDAO.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productDAO.getById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productDAO.update(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productDAO.delete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
