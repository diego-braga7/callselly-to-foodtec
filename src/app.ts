import express, { Application, Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes";
import * as dotenv from 'dotenv';

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas da API
app.use("/api", apiRoutes);

// Rota de exemplo
app.get("/", (req: Request, res: Response) => {
  res.send("API Intermediária Express com TypeScript");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
