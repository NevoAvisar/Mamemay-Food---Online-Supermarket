const express = require("express");
const authRouter = require("./auth/auth-routes");
const adminProductsRouter = require("./admin/products-routes");
const adminOrderRouter = require("./admin/order-routes");
const shopProductsRouter = require("./shop/products-routes");
const shopCartRouter = require("./shop/cart-routes");
const shopAddressRouter = require("./shop/address-routes");
const shopOrderRouter = require("./shop/order-routes");
const shopSearchRouter = require("./shop/search-routes");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin/products", adminProductsRouter);
router.use("/admin/orders", adminOrderRouter);
router.use("/shop/products", shopProductsRouter);
router.use("/shop/cart", shopCartRouter);
router.use("/shop/address", shopAddressRouter);
router.use("/shop/order", shopOrderRouter);
router.use("/shop/search", shopSearchRouter);

module.exports = router;
