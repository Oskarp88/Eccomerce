const express = require("express");
const categoryRouter = express.Router();


const { authenticate, authorizeAdmin } = require("../middlewares/authMiddlewares.js");
const { 
    createCategory, 
    listCategory, 
    readCategory, 
    removeCategory, 
    updateCategory 
} = require("../controllers/categoryControllers.js");

categoryRouter.route("/").post(authenticate, authorizeAdmin, createCategory);
categoryRouter.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
categoryRouter
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

categoryRouter.route("/categories").get(listCategory);
categoryRouter.route("/:id").get(readCategory);

module.exports = categoryRouter;