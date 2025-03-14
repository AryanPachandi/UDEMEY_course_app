const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

function AdminMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: 'Token is required' });
        }

        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        if (!decoded || decoded.user !== 'admin') {
            return res.status(401).json({
                error: 'Authentication failed',
                msg: 'Unauthorized access, only for admin'
            });
        }

        console.log(decoded);
        req.AdminID = decoded.id;
        next();
    } catch (err) {
        console.error("JWT verification error:", err.message);
        res.status(401).json({ msg: 'Invalid or expired token' });
    }
}

module.exports = { AdminMiddleware };
