const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");
const { validateOrder } = require("../../validations/order");
const { validateCapturePayment } = require("../../validations/payment");

const router = express.Router();

router.post("/create", validateOrder, createOrder);
router.post("/capture", validateCapturePayment, capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
