import express from "express";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { protectRoute, checkIsAdmin } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const userRoutes = express.Router();

//TODO: redefine expiresIn
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401).send("Invalid email or password");
    throw new Error("Invalid email or password.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("We already have an account with that email address.");
    throw new Error("We already have an account with that email address.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data.");
    // throw new Error(
    //   "Invalid user data. Please check your data and try again."
    // );
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // get user
  const user = await User.findById(req.params.id);

  // if user exists
  if (user) {
    const { name, email } = req.body;
    user.name = req.body && req.body.name ? name : user.name;
    user.email = req.body && req.body.email ? email : user.email;

    // if req.body contains password, update user password
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save newly updated user details
    const updatedUser = await user.save();

    // send json response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404).send("User not found");
    // throw new Error("User not found.");
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404).send("No orders found");
    // throw new Error("No orders found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);
    res.json(user);
  } catch (error) {
    res.status(404).send("User not found");
    throw new Error("User not found.");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
// if user is authenticated, proceed to next middleware ie updateUserProfile
userRoutes.route("/profile/:id").put(protectRoute, updateUserProfile);
userRoutes.route("/:id").get(protectRoute, getUserOrders);
// check if user is logged in and isAdmin, then get all users
userRoutes.route("/").get(protectRoute, checkIsAdmin, getAllUsers);
// check if user is logged in and isAdmin, then delete user
userRoutes.route("/:id").delete(protectRoute, checkIsAdmin, deleteUser);

export default userRoutes;
