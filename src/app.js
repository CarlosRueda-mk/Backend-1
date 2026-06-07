const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const handlebars = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const viewsRoutes = require("./routes/viewsRoutes.js");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRoutes);
app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});

module.exports = app;
