import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";
import { EmailService } from "./email.service";
import { OrderRepository } from "../repository/order.repository";
import { NotFoundError } from "../exceptions/notFound.exception";
import { OrderFoodTec } from "../interfaces/responseOrderFoodtec";
import { OrderStatus } from "../entity/order";
import { handleAxiosError, serializeError } from "../helpers/axiosErrorHandler";

export class ConfirmOrderService extends BaseVapiService {

    private apiUrl: string = process.env.URL_FOODTEC!;
    private apiUsername: string = process.env.USERNAME_FOODTEC!;
    private apiPassword: string = process.env.CONFIRM_ORDER_PASSWORD_FOODTEC!;

    private apiAuthToken: string = '';

    constructor(request: Request, response: Response) {
        super(request, response);
        this.apiAuthToken = Buffer.from(`${this.apiUsername}:${this.apiPassword}`).toString(
            "base64",
        );
    }

    async execute(vapiArguments: any) {

        if (vapiArguments == undefined) {
            return null;
        }
        let { externalRef, confirm } = vapiArguments; 

        const orderRepository = new OrderRepository();
        const order = await orderRepository.findOne(externalRef);

        if(!order || order == undefined){
            throw new NotFoundError(`Pedido ${externalRef} não encontrado!.`);
        }
        if(order.status == OrderStatus.ERROR){
            return "order created in error, cannot be changed"
        }

        if(!confirm && order.status != OrderStatus.COMPLETED){
            orderRepository.update(order.id, {status: OrderStatus.CANCELLED});
            return "Order canceled successfully";
        }

        if(order.status == OrderStatus.COMPLETED){
            return "Completed order cannot be changed"
        }

        let dataToFoodTec: OrderFoodTec;
        if (typeof order.data === "string") {
            dataToFoodTec = JSON.parse(order.data) as OrderFoodTec;
        } else {
            dataToFoodTec = order.data as OrderFoodTec;
        }

        dataToFoodTec.externalRef = order.id;

        console.log(vapiArguments);

        let baseUrl = this.apiUrl + `/ws/store/v1/orders?suspend=false`;

       try {
        const response = await axios.post(
            baseUrl,
            dataToFoodTec,
            {
                headers: {
                    Authorization: `Basic ${this.apiAuthToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const jsonText = JSON.stringify(response.data, null, 2);
        let dataUpdate = {
            data: response.data,
            status: OrderStatus.COMPLETED
        };

        orderRepository.update(order.id, dataUpdate)

        EmailService.send(process.env.LIST_EMAILS!, 'Confirmando pedido', `pedido aceito\n ${jsonText}`);
        
        return response.data;
       } catch (error: any) {

        orderRepository.update(order.id, {
            status: OrderStatus.ERROR,
            dataError: serializeError(error)
        });
        return handleAxiosError(error);
       }

    }

}