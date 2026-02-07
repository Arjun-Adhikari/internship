import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.model.js";
import Product from "./models/Product.model.js";

dotenv.config();

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Food" },
  { id: 4, name: "Auto" },
];


const products = [
  // Electronics (category_id: 1)
  {
    id: 1,
    name: "Samsung Galaxy S24",
    category_id: 1,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "MacBook Pro",
    category_id: 1,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Sony Headphones",
    category_id: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "iPad Air",
    category_id: 1,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
  },

  // Fashion (category_id: 2)
  {
    id: 5,
    name: "T-Shirt",
    category_id: 2,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Jeans",
    category_id: 2,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Sneakers",
    category_id: 2,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Leather Jacket",
    category_id: 2,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Summer Dress",
    category_id: 2,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
  },

  // Food (category_id: 3)
  {
    id: 10,
    name: "Pizza",
    category_id: 3,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Burger",
    category_id: 3,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Sushi",
    category_id: 3,
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop",
  },
  {
    id: 13,
    name: "Pasta",
    category_id: 3,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
  },
  {
    id: 14,
    name: "Ice Cream",
    category_id: 3,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
  },

  // Auto (category_id: 4)
  {
    id: 15,
    name: "Toyota Camry",
    category_id: 4,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=400&fit=crop",
  },
  {
    id: 16,
    name: "Honda Civic",
    category_id: 4,
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=400&fit=crop",
  },
  {
    id: 17,
    name: "Tesla Model 3",
    category_id: 4,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop",
  },
  {
    id: 18,
    name: "BMW X5",
    category_id: 4,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=400&fit=crop",
  },
  {
    id: 19,
    name: "Hyundai Creta",
    category_id: 4,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=400&fit=crop",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/allstore",
    );
    console.log("Connected to MongoDB");

    // 2. Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // 3. Insert categories
    await Category.insertMany(categories);
    console.log("Categories inserted:", categories.length);

    // 4. Insert products
    await Product.insertMany(products);
    console.log("Products inserted:", products.length);

    console.log("\n Database seeded successfully!");
    console.log("\n Summary:");
    console.log("   - Electronics: 4 products");
    console.log("   - Fashion: 5 products");
    console.log("   - Food: 5 products");
    console.log("   - Auto: 5 products");
    console.log("   - Total: 19 products\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
