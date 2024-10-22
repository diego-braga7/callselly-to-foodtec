import { Request, Response } from "express";
import axios from "axios";
import { MenuService } from "../services/menu.service";
import { OrderValidationService } from "../services/orderValidation.service";

const apiUrl = "https://dedhamlab.foodtecsolutions.com";
const apiUsername = "apiclient";
const apiPassword = "6SWXRaX8mBe48qH";
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
  "base64",
);
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
    const menuFoodtec = new MenuService(req, res);

    const result = await menuFoodtec.handle();
    
    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;

    console.error("Detalhes do erro:", errorMessage);
  }
};



export const orderValidate = async (req: Request, res: Response) => {
  try {
    const menuFoodtec = new OrderValidationService(req, res);

    const result = await menuFoodtec.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;

    console.error("Detalhes do erro:", errorMessage);

    res.status(error.response.status).json({ data: errorMessage });
  }
};