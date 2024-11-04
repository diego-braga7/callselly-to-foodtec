"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        if (!decoded) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.authMiddleware = authMiddleware;
