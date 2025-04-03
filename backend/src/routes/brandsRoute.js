const express = require('express');
const router = express.Router();
//const userController = require('../controllers/UserController');
const brandsController = require('../controllers/brandsController');
const AuthMid = require('../middlewares/middleware');


//Lấy tất cả brand
//[GET] localhost:3000/brand
router.get('/', brandsController.getAllBrands);

//tạo brand
//[POST] localhost:3000/brand
router.post('/', brandsController.createBrands);

//lấy brand theo id
//[GET] localhost:3000/brand/id
router.get('/:id', brandsController.getBrandsById);

//cập nhật brand
//[PUT]  localhost:3000/brand/id
router.put('/:id',brandsController.updateBrands);

//xóa brand
//[DELETE] localhost:3000/brand/id
router.delete('/:id', brandsController.deleteBrands);

module.exports = router;