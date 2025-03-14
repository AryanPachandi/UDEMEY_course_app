const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD, JWT_ADMIN_PASSWORD} = require('../config');
function UserMiddleware(req, res,next) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    if (decoded) {
        req.UserID = decoded.id;
        next();
    }else{
        res.status(401).json({
            msg: 'Authentication failed'
        })
    }
}

module.exports = {
    UserMiddleware: UserMiddleware,
};