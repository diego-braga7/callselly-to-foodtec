import { BaseVapiService } from "./baseVapi.service";
import { Request, Response } from "express";
import axios from "axios";

export class PhoneService extends BaseVapiService {



    constructor(request: Request, response: Response) {
        super(request, response);
        
    }

    async execute(vapiArguments: any) {

        if (vapiArguments == undefined) {
            return null;
        }

        console.log(vapiArguments);

        let { number } = vapiArguments;

        const cleanedNumber = number.replace(/\D/g, '');
      
        if (cleanedNumber.length !== 10) {
          throw new Error("O número deve conter exatamente 10 dígitos.");
        }
      
        return `${cleanedNumber.slice(0, 3)}-${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;

    }

}