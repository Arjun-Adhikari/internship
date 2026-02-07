// import express from 'express';
// import Category from '../models/Category.model.js';

// const router = express.Router();

// // GET all categories
// // URL: http://localhost:5000/api/categories
// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ id: 1 });
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching categories', error: error.message });
//   }
// });

// // GET single category by id
// // URL: http://localhost:5000/api/categories/1
// router.get('/:id', async (req, res) => {
//   try {
//     const category = await Category.findOne({ id: parseInt(req.params.id) });
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching category', error: error.message });
//   }
// });

// export default router;


import express from 'express';
import Category from '../models/Category.model.js';

const router = express.Router();

// ✅ PUT SPECIFIC ROUTES FIRST
// GET all categories
// URL: http://localhost:5000/api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ id: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// ✅ PUT DYNAMIC ROUTES LAST
// GET single category by id
// URL: http://localhost:5000/api/categories/1
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ id: parseInt(req.params.id) });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

export default router;