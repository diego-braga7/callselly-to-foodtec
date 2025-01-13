import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { OrderValidationService } from "../services/orderValidation.service";
import { ConfirmOrderService } from "../services/confirmOrder.service";
import { PhoneService } from "../services/phone.service";
import { BaseVapiService } from "../services/baseVapi.service";
import { baseException } from "../exceptions/base.exception";
import { QueryFailedError } from "typeorm";

export const MenuCategories = async (req: Request, res: Response) => {
  const menuFoodtec = new MenuService(req, res);
  baseHandleOrder(menuFoodtec, req, res);
};

export const orderValidate = async (req: Request, res: Response) => {
  const validateFoodtec = new OrderValidationService(req, res);
  baseHandleOrder(validateFoodtec, req, res);

};

export const confirmOrder = async (req: Request, res: Response) => {
  const confirmOrder = new ConfirmOrderService(req, res);
  baseHandleOrder(confirmOrder, req, res);
};

async function baseHandleOrder(base: BaseVapiService, req: Request, res: Response) {
  try {
    const result = await base.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error);
    let status = 500;
    let message:any = '';
    if (error instanceof baseException) {
      status = error.status;
      message = error.message;

    } else if (error instanceof QueryFailedError) {
      message = error.message;
    } else {
      message = error.response
      ? error.response.data
      : error.message;

      message = message.meta.code+`: ${message.meta.error}`;

      status = error.response.status;
    }

    const resultObject = [
      {
        toolCallId: base.vapiId,
        result: message,
      },
    ];
    const returnToVapi = {
      results: resultObject,
    };

    console.error("Detalhes do erro:", message);

    res.status(500).json(returnToVapi);
  }
}

export const formatPhone = async (req: Request, res: Response) => {
  try {
    const menuFoodtec = new PhoneService(req, res);

    const result = await menuFoodtec.handle();

    res.json(result);

  }
  catch (error: any) {
    if (error == baseException) {
      res.status(500).json({ data: error.message });
      return;
    }
    
    const errorMessage = error.response
      ? error.response.data
      : error.message;

    console.error("Detalhes do erro:", errorMessage);

    res.status(500).json({ data: errorMessage });
  }

};