const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Lấy tất cả sản phẩm show ra trang chủ
// [GET] localhost:3000/product
router.get('/', productController.getAllProduct);

// Lấy chi tiết sản phẩm theo ID
// [GET] localhost:3000/product/:id
router.get('/:id', productController.getProductById);

// Lấy sản phẩm theo hãng sản xuất
// [GET] localhost:3000/product/brand
router.post('/brand', productController.getProductsByBrand);

// Thêm sản phẩm mới
// [POST] localhost:3000/product
router.post('/', productController.createProduct);

// Cập nhật sản phẩm
// [PUT] localhost:3000/product/:id
router.put('/:id', productController.updateProduct);

// Xóa sản phẩm
// [DELETE] localhost:3000/product/:id
router.delete('/:id', productController.deleteProduct);

// tìm kiếm sản phẩm
// [POST] localhost:3000/product/search
router.post('/search', productController.searchProducts);

module.exports = router;