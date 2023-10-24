import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  // check if req.header has authorization and authorization startsWith Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // split req.headers.authorization and assign second value in array to token
      token = req.headers.authorization.split(" ")[1];
      // decode token using jwt secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, authentication failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, not authenticated to make this request");
  }
});

// middleware to check if user is Admin
const checkIsAdmin = (req, res, next) => {
  // if user exists and user is Admin
  if (req.user && req.user.isAdmin !== "false") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
};

export { protectRoute, checkIsAdmin };
