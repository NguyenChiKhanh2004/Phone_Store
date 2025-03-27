const {
    getAll,
    createReviews,
    updateReviews,
    deleteReviews,
    getReviewsByProductId
} = require('../models/reviewsModel');

class ReviewsController {
    async getAllReviews(req, res) {
        try {
            const reviews = await getAll();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createReviews(req, res) {
        const newReviews = req.body;
        try {
            await createReviews(newReviews);
            res.status(200).json("Reviews created successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateReviews(req, res) {
        const { id } = req.params;
        const updatedReviews = req.body;
        try {
            await updateReviews(id, updatedReviews);
            res.status(200).json({ message: "Reviews updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteReviews(req, res) {
        const { id } = req.params;
        try {
            await deleteReviews(id);
            res.status(200).json({ message: "Reviews deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReviewsByProductId(req, res) {
        const { id } = req.params;
        try {
            const reviews = await getReviewsByProductId(id);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ReviewsController();