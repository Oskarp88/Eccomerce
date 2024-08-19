const express = require("express");
const orderRouter = express.Router();

const { authenticate, authorizeAdmin } = require("../middlewares/authMiddlewares.js");
const { 
  calcualteTotalSalesByDate, 
  calculateTotalSales, 
  countTotalOrders, 
  createOrder, 
  findOrderById, 
  getAllOrders, 
  getUserOrders, 
  markOrderAsDelivered, 
  markOrderAsPaid } =  require("../controllers/orderControllers.js");

orderRouter
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

orderRouter.route("/mine").get(authenticate, getUserOrders);
orderRouter.route("/total-orders").get(countTotalOrders);
orderRouter.route("/total-sales").get(calculateTotalSales);
orderRouter.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
orderRouter.route("/:id").get(authenticate, findOrderById);
orderRouter.route("/:id/pay").put(authenticate, markOrderAsPaid);
orderRouter
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);

module.exports = orderRouter;