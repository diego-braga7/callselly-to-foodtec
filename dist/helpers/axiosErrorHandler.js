"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeError = exports.handleAxiosError = void 0;
const axios_1 = require("axios");
const flatted_1 = require("flatted");
/**
 * @param error O erro capturado
 */
function handleAxiosError(error) {
    if (!(error instanceof axios_1.AxiosError)) {
        console.error("Erro inesperado:", error);
        return "Unexpected error.";
    }
    const { response, request, message } = error;
    if (response) {
        console.error("Erro de resposta:", response.status, response.data);
        let messageError = error.response
            ? error.response.data
            : error.message;
        return {
            status: response.status,
            messageError
        };
    }
    if (request) {
        console.error("Nenhuma resposta recebida do servidor:", request);
        return "Network error: No response received from the server.";
    }
    console.error("Erro na configuração da requisição:", message);
    return `Error in request configuration: ${message}`;
}
exports.handleAxiosError = handleAxiosError;
function serializeError(error) {
    if (typeof error === "object" && error !== null) {
        const serializedError = {};
        if (error instanceof Error) {
            serializedError.name = error.name;
            serializedError.message = error.message;
            serializedError.stack = error.stack;
        }
        for (const key in error) {
            if (Object.prototype.hasOwnProperty.call(error, key)) {
                try {
                    const value = error[key];
                    serializedError[key] = typeof value === "object" ? (0, flatted_1.stringify)(value) : value;
                }
                catch (innerError) {
                    serializedError[key] = `Failed to serialize property: ${key}`;
                }
            }
        }
        return (0, flatted_1.stringify)(serializedError);
    }
    return String(error);
}
exports.serializeError = serializeError;
