const Orders = require('../models/ordersModel');

class OrdersController {
    async getAllOrders(req, res) {
        try {
            const orders = await Orders.getAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOrders(req, res) {
        const newOrder = req.body;
        try {
            await Orders.createOrders(newOrder);
            res.status(200).json({ message: "Order created successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrders(req, res) {
        const { id } = req.params;
        const updatedOrder = req.body;
        try {
            await Orders.updateOrders(id, updatedOrder);
            res.status(200).json({ message: "Order updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrders(req, res) {
        const { id } = req.params;
        try {
            await Orders.deleteOrders(id);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrdersByUserId(req, res) {
        const { id } = req.params;
        try {
            const orders = await Orders.getOrdersByUserId(id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrdersController();
