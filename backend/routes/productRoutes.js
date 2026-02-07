// // routes/productRoutes.js
// import express from "express";
// import Product from "../models/Product.model.js";
// import Category from "../models/Category.model.js";

// const router = express.Router();

// // GET all products with optional filters
// // URL: http://localhost:5000/api/products
// // URL: http://localhost:5000/api/products?category=2
// // URL: http://localhost:5000/api/products?search=Pizza
// router.get("/", async (req, res) => {
//   try {
//     const { category, search } = req.query;
//     let query = {};

//     // Filter by category
//     if (category && category !== "all") {
//       query.category_id = parseInt(category);
//     }

//     // Search by product name
//     if (search && search.trim() !== "") {
//       query.name = { $regex: search, $options: "i" };
//     }

//     const products = await Product.find(query).sort({ id: 1 });

//     // Add category_name to each product
//     const productsWithCategory = await Promise.all(
//       products.map(async (product) => {
//         const category = await Category.findOne({ id: product.category_id });
//         return {
//           id: product.id,
//           name: product.name,
//           category_id: product.category_id,
//           category_name: category ? category.name : "Unknown",
//           image: product.image,
//         };
//       }),
//     );

//     res.json(productsWithCategory);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching products", error: error.message });
//   }
// });

// // GET single product by id
// // URL: http://localhost:5000/api/products/2
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findOne({ id: parseInt(req.params.id) });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Add category_name to product
//     const category = await Category.findOne({ id: product.category_id });

//     const productWithCategory = {
//       id: product.id,
//       name: product.name,
//       category_id: product.category_id,
//       category_name: category ? category.name : "Unknown",
//       image: product.image,
//     };

//     res.json(productWithCategory);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching product", error: error.message });
//   }
// });

// export default router;


import express from "express";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";

const router = express.Router();

// ✅ PUT SPECIFIC ROUTES FIRST
// GET all products with optional filters
// URL: http://localhost:5000/api/products
// URL: http://localhost:5000/api/products?category=2
// URL: http://localhost:5000/api/products?search=Pizza
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category_id = parseInt(category);
    }

    // Search by product name
    if (search && search.trim() !== "") {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).sort({ id: 1 });

    // Add category_name to each product
    const productsWithCategory = await Promise.all(
      products.map(async (product) => {
        const category = await Category.findOne({ id: product.category_id });
        return {
          id: product.id,
          name: product.name,
          category_id: product.category_id,
          category_name: category ? category.name : "Unknown",
          image: product.image,
        };
      })
    );

    res.json(productsWithCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add category_name to product
    const category = await Category.findOne({ id: product.category_id });

    const productWithCategory = {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      category_name: category ? category.name : "Unknown",
      image: product.image,
    };

    res.json(productWithCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

export default router;