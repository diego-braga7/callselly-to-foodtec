import { Request, Response } from "express";
import axios from "axios";

export const getDataFromAnotherAPI = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.exemplo.com/endpoint");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao acessar API externa" });
  }
};
