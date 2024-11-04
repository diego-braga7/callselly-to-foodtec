"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'your-secret-key'; // Use uma variável de ambiente para isso em produção
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
}
exports.verifyToken = verifyToken;