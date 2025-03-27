const express = require('express');
const router = express.Router();
const OrderItemsController = require('../controllers/OrderItemsController');


// [GET] localhost:3000/orderItems
router.get('/', OrderItemsController.getAllOdersItems);

// Tạo orderItems
// [POST] localhost:300/orderItems
router.post('/', OrderItemsController.createOrderItems)

// Cập nhật orderItems
// [PUT] localhost:3000/orderItems/:id
router.put('/:id', OrderItemsController.updateOrderItems);

// Xóa orderItems
// [DELETE] localhost:3000/orderItems/:id
router.delete('/:id', OrderItemsController.deleteOrderItems);

// Lấy ra orderItems theo order_id
// [GET] localhost:3000/orderItems/:id
router.get('/:id', OrderItemsController.getOrderItemsByOrderId);

module.exports = router;