"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneService = void 0;
const baseVapi_service_1 = require("./baseVapi.service");
class PhoneService extends baseVapi_service_1.BaseVapiService {
    constructor(request, response) {
        super(request, response);
    }
    execute(vapiArguments) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.PhoneService = PhoneService;
