"use strict";
// src/utils/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (res, error, message = 'Internal server error', statusCode = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
