"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const base_exception_1 = require("./base.exception");
class NotFoundError extends base_exception_1.baseException {
    constructor(message) {
        super(message, "NotFoundError", 404);
    }
}
exports.NotFoundError = NotFoundError;
