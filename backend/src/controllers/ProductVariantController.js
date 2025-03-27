
const {
    getAll,
    createVariant,
    checkVariant,
    updateVariant,
    getProductById,
    deleteVariant,
    getProductByColor,
    getProductByMemory
} = require('../models/productVariantModel');

class ProductVariantController {
    async getAllVariants(req, res) {
        try {
            const variants = await getAll();
            res.status(200).json(variants);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createVariant(req, res) {
        const newVariant = req.body;
        try {
            const existingVariant = await checkVariant(
                newVariant.product_id,
                newVariant.color,
                newVariant.ram,
                newVariant.rom
            );
            if (existingVariant.length > 0) {
                return res.status(400).json({ message: "Biến thể sản phẩm đã tồn tại!" });
            }

            await createVariant(newVariant);
            res.status(201).json({ message: "Biến thể sản phẩm đã được tạo thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateVariant(req, res) {
        const { id } = req.params;
        const updatedVariant = req.body;
        try {
            await updateVariant(id, updatedVariant);
            res.status(200).json({ message: "Cập nhật biến thể sản phẩm thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getVariantById(req, res) {
        const { id } = req.params;
        try {
            const product = await getProductById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteVariant(req, res) {
        const { id } = req.params;
        try {
            await deleteVariant(id);
            res.status(200).json({ message: "Xóa biến thể sản phẩm thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getVariantByColor(req, res) {
        try {
            const { product_id, color } = req.body;
            if (!product_id || !color) {
                return res.status(400).json({ message: "Vui lòng cung cấp product_id và color." });
            }
            const products = await getProductByColor(product_id, color);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getVariantBymemory(req, res) {
        try {
            const { product_id, ram, rom } = req.body;
            if (!product_id || !ram || !rom) {
                return res.status(400).json({ message: "Vui lòng cung cấp product_id, ram và rom." });
            }
            const products = await getProductByMemory(product_id, ram, rom);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductVariantController();
