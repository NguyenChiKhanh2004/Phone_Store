const Product = require('../models/productModel');

class ProductController {
    async getAllProduct(req, res) {
        try {
            const products = await Product.getIdNamePriceImage();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsByBrand(req, res) {
        try {
            const { brand } = req.body; // Get brand from JSON body
            if (!brand) {
                return res.status(400).json({ message: "Vui lòng cung cấp tên hãng sản xuất." });
            }

            const products = await Product.getProductByBrand(brand);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        const newProduct = req.body;
        try {
            const product = await Product.createProduct(newProduct);
            res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const updatedProduct = req.body;
        try {
            await Product.updateProduct(id, updatedProduct);
            res.status(200).json({ message: "Product updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            await Product.deleteProduct(id);
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchProducts(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Vui lòng cung cấp name" });
            }
            const products = await Product.searchProducts(name);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();
