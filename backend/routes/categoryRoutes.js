import express from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/category.controller.js";

const router = express.Router();

// URL: http://localhost:5000/api/categories
router.get("/", getAllCategories);

// URL: http://localhost:5000/api/categories/1
router.get("/:id", getCategoryById);

export default router;
