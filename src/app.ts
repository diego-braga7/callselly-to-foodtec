import express, { Application, Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes";
import * as dotenv from 'dotenv';
import { basicAuth } from "./middleware/authMiddleware";

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", basicAuth, apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
