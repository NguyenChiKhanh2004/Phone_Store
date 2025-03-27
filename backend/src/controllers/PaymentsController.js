const Payments = require('../models/paymentsModel');

class PaymentsController {
    async getAllPayments(req, res) {
        try {
            const payments = await Payments.getAll();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createPayments(req, res) {
        const newPayments = req.body;
        try {
            const NewPayments = await Payments.createPayments(newPayments);
            res.status(200).json("NewPayments created successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePayments(req, res) {
        const { id } = req.params;
        const updatedPayments = req.body;
        try {
            await Payments.updatePayments(id, updatedPayments);
            res.status(200).json({ message: "NewPayments updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePayments(req, res) {
        const { id } = req.params;
        try {
            await Payments.deletePayments(id);
            res.status(200).json({ message: "NewPayments deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPaymentsByOrderId(req, res) {
        const { id } = req.params;
        try {
            const payments = await Payments.getPaymentsByOrderId(id);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPaymentsByUserId(req, res) {
        const { user_id } = req.params;
        try {
            const payments = await Payments.getPaymentsByUserId(user_id);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PaymentsController();