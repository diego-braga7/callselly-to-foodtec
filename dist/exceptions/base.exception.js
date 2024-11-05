"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseException = void 0;
class baseException extends Error {
    constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
    }
}
exports.baseException = baseException;
