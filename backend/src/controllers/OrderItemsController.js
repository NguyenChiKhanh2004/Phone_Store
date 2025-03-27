const OrderItems = require('../models/orderItemsModel');

class OrderItemsController {
    async getAllOdersItems(req, res) {
        try {
            const orderItems = await OrderItems.getAll();
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOrderItems(req, res) {
        const newOrderItem = req.body;
        try {
            await OrderItems.createOrderItems(newOrderItem);
            res.status(200).json({ message: "New order item created successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrderItems(req, res) {
        const { id } = req.params;
        const updatedOrderItem = req.body;
        try {
            await OrderItems.updateOrderItems(id, updatedOrderItem);
            res.status(200).json({ message: "Order item updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrderItems(req, res) {
        const { id } = req.params;
        try {
            await OrderItems.deleteOrderItems(id);
            res.status(200).json({ message: "Order item deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrderItemsByOrderId(req, res) {
        const { id } = req.params;
        try {
            const orderItems = await OrderItems.getOrderItemsByOrderId(id);
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrderItemsController();
