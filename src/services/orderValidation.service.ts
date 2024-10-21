import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";

export class OrderValidationService extends BaseVapiService {

    private apiUrl: string = "https://dedhamlab.foodtecsolutions.com";
    private apiUsername: string = "apiclient";
    private apiPassword: string = "PxpCTLHN6vUdr5h";

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
        return response.data;

    }

}