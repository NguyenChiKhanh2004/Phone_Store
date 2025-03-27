const express = require('express');
const router = express.Router();
const PaymentsController = require('../controllers/PaymentsController');


// [GET] localhost:3000/payments
router.get('/', PaymentsController.getAllPayments);

// Tạo payments
// [POST] localhost:300/payments
router.post('/', PaymentsController.createPayments)

// Cập nhật payments
// [PUT] localhost:3000/payments/:id
router.put('/:id', PaymentsController.updatePayments);

// Xóa payments
// [DELETE] localhost:3000/payments/:id
router.delete('/:id', PaymentsController.deletePayments);

// Lấy ra payments theo order_id
// [GET] localhost:3000/payments/:id
router.get('/:id', PaymentsController.getPaymentsByOrderId);

module.exports = router;