"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Rotas da API
app.use("/api", apiRoutes_1.default);
// Rota de exemplo
app.get("/", (req, res) => {
    res.send("API Intermediária Express com TypeScript");
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
