import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { OrderValidationService } from "../services/orderValidation.service";
import { ConfirmOrderService } from "../services/confirmOrder.service";
import { PhoneService } from "../services/phone.service";
import { OrderRepository } from "../repository/order.repository";
import { OrderStatus } from "../entity/order";
import { BaseVapiService } from "../services/baseVapi.service";


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

async function baseHandleOrder(base: BaseVapiService, req: Request, res: Response){
  try {

    const result = await base.handle();

    res.json(result);

  } catch (error: any) {
    console.log(error.response);
    const errorMessage = error.response
      ? error.response.data
      : error.message;
      const orderRepository = new OrderRepository();
      orderRepository.createOrder(errorMessage, OrderStatus.ERROR);

    const resultObject = [
      {
        toolCallId: base.vapiId,
        result: errorMessage,
      },
    ];
    const returnToVapi = {
      results: resultObject,
    };

    console.error("Detalhes do erro:", errorMessage);

    res.status(error.response.status).json(returnToVapi);
  }
}

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