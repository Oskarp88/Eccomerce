const express = require("express");
const formidable = require("express-formidable");
const productRouter = express.Router();

// controllers
const {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} = require("../controllers/productControllers.js");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddlewares.js");
const checkId =  require("../middlewares/checkId.js");

productRouter
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

productRouter.route("/allproducts").get(fetchAllProducts);
productRouter.route("/:id/reviews").post(authenticate, checkId, addProductReview);

productRouter.get("/top", fetchTopProducts);
productRouter.get("/new", fetchNewProducts);

productRouter
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

productRouter.route("/filtered-products").post(filterProducts);

module.exports = productRouter;