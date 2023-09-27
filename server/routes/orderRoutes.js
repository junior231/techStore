import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import protectRoute from "../middleware/authMiddleware.js";

const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo,
  } = req.body;

  // if order items array is empty, return error
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    // create new order
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingPrice,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      totalPrice,
    });

    // return created order
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

orderRoutes.route("/").post(protectRoute, createOrder);

export default orderRoutes;
