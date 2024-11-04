import express, { Application, Request, Response } from "express";
import apiRoutes from "./routes/apiRoutes";
import * as dotenv from 'dotenv';
import { authMiddleware } from "./middleware/authMiddleware";
import authRoutes from './routes/auth';
import "reflect-metadata";
import {AppDataSource } from "./data-source";
import path from "path";

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

app.use("/api", authMiddleware, apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
    
    console.log("Entidades carregadas:", AppDataSource.entityMetadatas.map(meta => meta.name));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error: ", error));