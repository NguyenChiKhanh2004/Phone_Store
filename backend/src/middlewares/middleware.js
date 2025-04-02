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

module.exports={
    authMiddleware
}