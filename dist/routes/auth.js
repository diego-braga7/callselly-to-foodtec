"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const users = [];
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = users.find((u) => u.username === username);
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = (0, jwtUtils_1.generateToken)({ username });
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/protected', authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
exports.default = router;
