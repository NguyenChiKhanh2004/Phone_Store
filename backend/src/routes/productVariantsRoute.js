// routes/ProductVariantRouter.js
const express = require('express');
const router = express.Router();
const productVariantController = require('../controllers/ProductVariantController');

// Lấy tất cả biến thể sản phẩm
// [GET] localhost:3000/productVariants
router.get('/', productVariantController.getAllVariants);

// Thêm mới biến thể sản phẩm
// [POST] localhost:3000/productVariants
router.post('/', productVariantController.createVariant);

//Lấy chi tiết sản phẩm theo id
// [GET] localhost:3000/productVariants/:id
router.get('/:id', productVariantController.getVariantById);

// Cập nhật biến thể sản phẩm
// [PUT] localhost:3000/productVariants/:id
router.put('/:id', productVariantController.updateVariant);

// Xóa biến thể sản phẩm
// [DELETE] localhost:3000/productVariants/:id
router.delete('/:id', productVariantController.deleteVariant);



//Lấy biến thể theo màu
// [POST] localhost:3000/productVariants/color
router.post('/color', productVariantController.getVariantByColor);

//Lấy biến thể theo ram
// [POST] localhost:3000/productVariants/ram
router.post('/memory', productVariantController.getVariantBymemory);


module.exports = router;
