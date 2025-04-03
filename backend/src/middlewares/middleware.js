const auth = require('../utils/auth');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json("Access denied");
    }
    const user = auth.verifyToken(token);
    if (!user) {
        console.error("Invalid token");
        return res.status(403).json("Invalid token");
    }
    req.user = user;
    req.locals = user;
    next();
};

const checkAuth = (req, res) => {
    
    const token = req.cookies.accessToken; // Lưu ý tên phải trùng

    if (!token) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const user = auth.verifyToken(token);

    if (!user) {
        return res.status(403).json({ message: "Token không hợp lệ" });
    }

    res.json({ message: "Đã xác thực", user });
};

module.exports={
    authMiddleware,
    checkAuth
}