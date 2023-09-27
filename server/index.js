import dotenv from "dotenv";
import connectToDatabase from "./db.js";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

const port = process.env.PORT || 5000;

dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());

app.use(cors());

// products routes
app.use("/api/products", productRoutes);

// user routes
app.use("/api/users", userRoutes);

//order routes
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
