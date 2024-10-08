import { Request, Response } from "express";
import axios from "axios";

const apiUrl = process.env.URL_FOODTEC;
const apiUsername = process.env.USERNAME_FOODTEC;
const apiPassword = process.env.PASSWORD_FOODTEC;
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64");
export const getDataFromAnotherAPI = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.exemplo.com/endpoint");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao acessar API externa" });
  }
};


export const MenuCategories = async (req: Request, res: Response) => {
    try {
      const response = await axios.get( apiUrl + "/ws/store/v1/menu/categories?orderType=Delivery",
        {
            headers: {
              Authorization: `Basic ${apiAuthToken}`
            }
          }
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Erro ao acessar API externa" });
    }
  };


