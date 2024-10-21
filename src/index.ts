import express, { Application, Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes";
import * as dotenv from 'dotenv';
import { authMiddleware } from "./middleware/authMiddleware";
import authRoutes from './routes/auth';

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

app.use("/api", authMiddleware, apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
