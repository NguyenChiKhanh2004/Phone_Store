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
    async createOrderDetail(req, res) {
        const { userId, shippingAddress, billingAddress, notes, itemsJson, paymentMethod } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!userId || !shippingAddress || !billingAddress || !notes || !itemsJson || !paymentMethod) {
            return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
        }

        try {
            // Gọi Orders Model để tạo đơn hàng
            const result = await Orders.createOrderDetail(
                userId,
                shippingAddress,
                billingAddress,
                notes,
                itemsJson,  // Truyền trực tiếp nếu đây đã là JSON hợp lệ
                paymentMethod
            );

            res.status(200).json(result);
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }

}

module.exports = new OrdersController();
