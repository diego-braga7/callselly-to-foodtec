import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";

export class ConfirmOrderService extends BaseVapiService {

    private apiUrl: string = "https://dedhamlab.foodtecsolutions.com";
    private apiUsername: string = "apiclient";
    private apiPassword: string = "V4poMTyy8mhpAeF";

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
        return response.data;

    }

}