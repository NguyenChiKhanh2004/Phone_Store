const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToKen= (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRATION
    });
}

//giải mã token -> lấy ra payload |
const verifyToken = (token) =>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        return null;
    }
}

module.exports={
    generateAccessToKen, verifyToken
}