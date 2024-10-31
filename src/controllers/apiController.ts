import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { OrderValidationService } from "../services/orderValidation.service";
import { ConfirmOrderService } from "../services/confirmOrder.service";
import { PhoneService } from "../services/phone.service";


export const MenuCategories = async (req: Request, res: Response) => {
  const menuFoodtec = new MenuService(req, res);
  try {

    const result = await menuFoodtec.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;

      const resultObject = [
        {
          toolCallId: menuFoodtec.vapiId,
          result: errorMessage,
        },
      ];
      const returnToVapi = {
        results: resultObject,
      };
  
      console.error("Detalhes do erro:", errorMessage);
  
      res.status(error.response.status).json(returnToVapi);
  }
};



export const orderValidate = async (req: Request, res: Response) => {
  const validateFoodtec = new OrderValidationService(req, res);
  try {

    const result = await validateFoodtec.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;

    const resultObject = [
      {
        toolCallId: validateFoodtec.vapiId,
        result: errorMessage,
      },
    ];
    const returnToVapi = {
      results: resultObject,
    };

    console.error("Detalhes do erro:", errorMessage);

    res.status(error.response.status).json(returnToVapi);
  }
};

export const confirmOrder = async (req: Request, res: Response) => {
  const confirmOrder = new ConfirmOrderService(req, res);
  try {

    const result = await confirmOrder.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;

    const resultObject = [
      {
        toolCallId: confirmOrder.vapiId,
        result: errorMessage,
      },
    ];
    const returnToVapi = {
      results: resultObject,
    };

    console.error("Detalhes do erro:", errorMessage);

    res.status(error.response.status).json(returnToVapi);
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