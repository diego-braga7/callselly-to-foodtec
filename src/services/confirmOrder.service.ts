import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";
import { EmailService } from "./email.service";

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

        console.log(vapiArguments);

        let baseUrl = this.apiUrl + `/ws/store/v1/orders?suspend=false`;

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

        EmailService.send(process.env.LIST_EMAILS!, 'Confirmando pedido', `pedido aceito\n ${jsonText}`);
        return response.data;

    }

}