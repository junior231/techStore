import express from "express";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import protectRoute from "../middleware/authMiddleware.js";

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
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or passwword.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("We already have an account with that email address.");
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
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send("We could not register you.");
    throw new Error(
      "Something went wrong. Please check your data and try again."
    );
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
    res.status(404);
    throw new Error("User not found.");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
// if user is authenticated, proceed to next middleware ie updateUserProfile
userRoutes.route("/profile/:id").put(protectRoute, updateUserProfile);

export default userRoutes;
