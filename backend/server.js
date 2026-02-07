import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./DB/ConnectDB.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SurkhetStore API",
    endpoints: {
      categories: "/api/categories",
      products: "/api/products",
      singleCategory: "/api/categories/:id",
      singleProduct: "/api/products/:id",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const startServer = async () => {
  try {
    await ConnectDB();

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
