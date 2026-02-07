import Product from '../models/Product.model.js';
import Category from '../models/Category.model.js';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category_id', 'name');
        
        const formattedProducts = products.map(product => ({
            id: product._id,
            name: product.name,
            category_id: product.category_id._id,
            category_name: product.category_id.name,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));

        res.status(200).json({
            success: true,
            count: formattedProducts.length,
            data: formattedProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category_id', 'name');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Format response
        const formattedProduct = {
            id: product._id,
            name: product.name,
            category_id: product.category_id._id,
            category_name: product.category_id.name,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        res.status(200).json({
            success: true,
            data: formattedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};


const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category_id: req.params.categoryId })
            .populate('category_id', 'name');

        const formattedProducts = products.map(product => ({
            id: product._id,
            name: product.name,
            category_id: product.category_id._id,
            category_name: product.category_id.name,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));

        res.status(200).json({
            success: true,
            count: formattedProducts.length,
            data: formattedProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products by category',
            error: error.message
        });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, category_id, image } = req.body;

        // Check if category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const product = await Product.create({ name, category_id, image });
        
        // Populate category details
        await product.populate('category_id', 'name');

        const formattedProduct = {
            id: product._id,
            name: product.name,
            category_id: product.category_id._id,
            category_name: product.category_id.name,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: formattedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        // If category_id is being updated, check if it exists
        if (req.body.category_id) {
            const category = await Category.findById(req.body.category_id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('category_id', 'name');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const formattedProduct = {
            id: product._id,
            name: product.name,
            category_id: product.category_id._id,
            category_name: product.category_id.name,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: formattedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};