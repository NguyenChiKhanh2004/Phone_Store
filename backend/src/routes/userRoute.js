const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const AuthMid = require('../middlewares/middleware');


//Lấy tất cả user
// [GET] localhost:3000/user
router.get('/',AuthMid.authMiddleware, userController.getAllUsers);

// [GET] localhost:3000/user
router.get('/:id',AuthMid.authMiddleware ,userController.getUsersById);

// Đăng ký
// [POST] localhost:300/user
router.post('/', userController.createUsers)

// Đăng nhập
//[POST] localhost:3000/user/login
router.post('/login', userController.login)

// [GET] localhost:3000/user/login
router.get('/login', (req, res) => {
    res.render('login');
});

// Cập nhật user
// [PUT] localhost:3000/user/:id
router.put('/:id',AuthMid.authMiddleware, userController.updateUsers);

// Xóa user
// [DELETE] localhost:3000/user/:id
router.delete('/:id',AuthMid.authMiddleware, userController.deleteUsers);

//lấy thông tin user
//[GET] localhost:3000/user/profile
router.get('/profile', AuthMid.authMiddleware, userController.getProfile);

module.exports = router;