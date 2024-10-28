import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { OrderValidationService } from "../services/orderValidation.service";
import { ConfirmOrderService } from "../services/confirmOrder.service";
import { PhoneService } from "../services/phone.service";

const apiUrl = "https://dedhamlab.foodtecsolutions.com";
const apiUsername = "apiclient";
const apiPassword = "6SWXRaX8mBe48qH";
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
  "base64",
);


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
    res.status(error.response.status).json({ data: errorMessage });
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

export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const menuFoodtec = new ConfirmOrderService(req, res);

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


export const formatPhone = async (req: Request, res: Response) => {
  try {
    const menuFoodtec = new PhoneService(req, res);

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