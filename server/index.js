import dotenv from "dotenv";
import connectToDatabase from "./db.js";
import express from "express";
import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT || 5000;

dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());

// products routes
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
