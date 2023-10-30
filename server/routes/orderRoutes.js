import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import { protectRoute, checkIsAdmin } from "../middleware/authMiddleware.js";

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

// get all orders
const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

// delete order
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// handle order delivery status
const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if order exists, update isDelivered prop and save order, else throw error.
  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order could not be updated.");
  }
});

orderRoutes.route("/").post(protectRoute, createOrder);
orderRoutes.route("/:id").delete(protectRoute, checkIsAdmin, deleteOrder);
orderRoutes.route("/:id").put(protectRoute, checkIsAdmin, setDelivered);
orderRoutes.route("/").get(protectRoute, checkIsAdmin, getOrders);

export default orderRoutes;
