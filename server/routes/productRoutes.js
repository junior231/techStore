import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { checkIsAdmin, protectRoute } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
};

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;

  // find product being reviewed
  const product = await Product.findById(req.params.id);

  // fing user reviewing product
  const user = await User.findById(userId);

  if (product) {
    // check if user already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // create new review
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    // update Product reviews
    product.reviews.push(review);

    // update Product number of reviews
    product.numberOfReviews = product.reviews.length;

    // update product rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review has been saved" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create New Product
const createNewProduct = asyncHandler(async (req, res) => {
  // get new product props from request body
  const {
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
  } = req.body;

  // create new product in database
  const newProduct = await Product.create({
    brand,
    name,
    category,
    price,
    stock,
    image: "/images/" + image,
    productIsNew,
    stock,
    description,
  });

  // save newly created product
  await newProduct.save();

  // get all products
  const products = await Product.find({});

  // if new product has been created and saved, return products array
  if (newProduct) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Unable to create new product.");
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404);
    throw new Error("Product could not be deleted.");
  }
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    image,
    category,
    stock,
    price,
    id,
    productIsNew,
    description,
  } = req.body;

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = "/images/" + image;
    product.category = category;
    product.stock = stock;
    product.productIsNew = productIsNew;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

productRoutes.route("/").get(getProducts);
productRoutes.route("/:id").get(getProduct);
productRoutes.route("/reviews/:id").post(protectRoute, createProductReview);
productRoutes.route("/").put(protectRoute, checkIsAdmin, updateProduct);
productRoutes.route("/:id").delete(protectRoute, checkIsAdmin, deleteProduct);
productRoutes.route("/").post(protectRoute, checkIsAdmin, createNewProduct);

export default productRoutes;
