const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/ordersController');


// [GET] localhost:3000/orders
router.get('/', OrdersController.getAllOrders);

// Tạo orders
// [POST] localhost:3000/orders
router.post('/', OrdersController.createOrders)

// Cập nhật orders
// [PUT] localhost:3000/orders/:id
router.put('/:id', OrdersController.updateOrders);

// Xóa orders
// [DELETE] localhost:3000/orders/:id
router.delete('/:id', OrdersController.deleteOrders);

// Lấy ra orders theo user_id
// [GET] localhost:3000/orders/:id
router.get('/:id', OrdersController.getOrdersByUserId);

module.exports = router;