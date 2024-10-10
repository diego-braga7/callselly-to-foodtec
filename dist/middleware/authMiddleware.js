"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = void 0;
const USERNAME = process.env.API_USERNAME || "admin";
const PASSWORD = process.env.API_PASSWORD || "password";
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", "Basic");
        res.status(401).json({ message: "Autenticação necessária" });
        return;
    }
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    if (username === USERNAME && password === PASSWORD) {
        next();
    }
    else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
};
exports.basicAuth = basicAuth;
