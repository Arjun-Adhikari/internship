import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "all") {
      query.category_id = parseInt(category);
    }

    if (search && search.trim() !== "") {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).sort({ id: 1 });

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
      }),
    );

    res.json(productsWithCategory);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

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
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};
