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

// Tạo order detail
// [POST] localhost:3000/orders/createOrderDetail
router.post('/createOrderDetail', OrdersController.createOrderDetail);

// Lấy lịch sử đơn hàng theo user_id
// [GET] localhost:3000/orders/history/:userId
router.get('/history/:userId', OrdersController.getOrderHistoryByUserId);

module.exports = router;