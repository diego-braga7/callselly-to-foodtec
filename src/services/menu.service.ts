import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";

export class MenuService extends BaseVapiService {

    private apiUrl: string = process.env.URL_FOODTEC!;
    private apiUsername: string = process.env.USERNAME_FOODTEC!;
    private apiPassword: string = process.env.MENU_PASSWORD_FOODTEC!;

    private apiAuthToken: string = '';

    constructor(request: Request, response: Response) {
        super(request, response);
        this.apiAuthToken = Buffer.from(`${this.apiUsername}:${this.apiPassword}`).toString(
            "base64",
        );
    }

    async execute(vapiArguments: any){

        let { category, items, orderType } = vapiArguments;

        if (orderType == undefined) {
            orderType = "Delivery";
        }
        let baseUrl = this.apiUrl + `/ws/store/v1/menu/categories`;

        if (category) {
            baseUrl = baseUrl + `/${category}`;
        }

        console.log(items);

        if (category && items) {
            baseUrl = baseUrl + `/items/${items}`;
        }

        baseUrl = baseUrl + `?orderType=${orderType}`;
        console.log(baseUrl);
        const response = await axios.get(baseUrl, {
            headers: {
                Authorization: `Basic ${this.apiAuthToken}`,
            },
        });
        return response.data;

    }

}