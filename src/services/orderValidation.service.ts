import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";
import { EmailService } from "./email.service";
import { OrderRepository } from "../repository/order.repository";
import { OrderStatus } from "../entity/order";
import { OrderFoodTec } from "../interfaces/responseOrderFoodtec";

export class OrderValidationService extends BaseVapiService {

    private apiUrl: string = process.env.URL_FOODTEC!;
    private apiUsername: string = process.env.USERNAME_FOODTEC!;
    private apiPassword: string = process.env.VALIDATE_ORDER_PASSWORD_FOODTEC!;

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

        console.log(vapiArguments);

        let baseUrl = this.apiUrl + `/ws/store/v1/validate/order`;

        const response = await axios.post(
            baseUrl,
            vapiArguments,
            {
                headers: {
                    Authorization: `Basic ${this.apiAuthToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const jsonText = JSON.stringify(response.data, null, 2);

        const orderRepository = new OrderRepository();
        const order = await orderRepository.create(response.data, OrderStatus.PENDING);
        const orderResponseVapi = order.data as unknown as OrderFoodTec;
        orderResponseVapi.externalRef = order.id;

        EmailService.send(process.env.LIST_EMAILS!, 'Validando pedido', `Validando pedido\n ${jsonText}`);

        return orderResponseVapi;

    }

}