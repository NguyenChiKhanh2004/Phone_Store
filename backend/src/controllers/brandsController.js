const brands = require('../models/brandsModel');

class BrandsController {
    async getAllBrands(req, res) {
        try {
            const allBrands = await brands.getAllBrands();
            res.status(200).json(allBrands);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createBrands(req, res) {
        const newBrand = req.body;
        try {
            await brands.createBrands(newBrand);
            res.status(200).json("Brand created successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateBrands(req, res) {
        try {
            const { id } = req.params;
            const updatedBrand = req.body;
            const result = await brands.updateBrands(id, updatedBrand);

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Brand does not exist" });
            }

            res.json({ message: "Brand updated successfully!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteBrands(req, res) {
        try {
            const { id } = req.params;
            const result = await brands.deleteBrands(id);

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Brand does not exist" });
            }

            res.json({ message: "Brand deleted successfully!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBrandsById(req, res) {
        try {
            const { id } = req.params;
            const brand = await brands.getBrandsById(id);

            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }

            res.status(200).json(brand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BrandsController();
