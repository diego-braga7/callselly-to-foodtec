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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmOrderService = void 0;
const baseVapi_service_1 = require("./baseVapi.service");
const axios_1 = __importDefault(require("axios"));
const email_service_1 = require("./email.service");
const order_repository_1 = require("../repository/order.repository");
const notFound_exception_1 = require("../exceptions/notFound.exception");
const order_1 = require("../entity/order");
const axiosErrorHandler_1 = require("../helpers/axiosErrorHandler");
class ConfirmOrderService extends baseVapi_service_1.BaseVapiService {
    constructor(request, response) {
        super(request, response);
        this.apiUrl = process.env.URL_FOODTEC;
        this.apiUsername = process.env.USERNAME_FOODTEC;
        this.apiPassword = process.env.CONFIRM_ORDER_PASSWORD_FOODTEC;
        this.apiAuthToken = '';
        this.apiAuthToken = Buffer.from(`${this.apiUsername}:${this.apiPassword}`).toString("base64");
    }
    execute(vapiArguments) {
        return __awaiter(this, void 0, void 0, function* () {
            if (vapiArguments == undefined) {
                return null;
            }
            let { externalRef, confirm } = vapiArguments;
            const orderRepository = new order_repository_1.OrderRepository();
            const order = yield orderRepository.findOne(externalRef);
            if (!order || order == undefined) {
                throw new notFound_exception_1.NotFoundError(`Pedido ${externalRef} não encontrado!.`);
            }
            if (order.status == order_1.OrderStatus.ERROR) {
                return "order created in error, cannot be changed";
            }
            if (!confirm && order.status != order_1.OrderStatus.COMPLETED) {
                orderRepository.update(order.id, { status: order_1.OrderStatus.CANCELLED });
                return "Order canceled successfully";
            }
            if (order.status == order_1.OrderStatus.COMPLETED) {
                return "Completed order cannot be changed";
            }
            let dataToFoodTec;
            if (typeof order.data === "string") {
                dataToFoodTec = JSON.parse(order.data);
            }
            else {
                dataToFoodTec = order.data;
            }
            dataToFoodTec.externalRef = order.id;
            console.log(vapiArguments);
            let baseUrl = this.apiUrl + `/ws/store/v1/orders?suspend=false`;
            try {
                const response = yield axios_1.default.post(baseUrl, dataToFoodTec, {
                    headers: {
                        Authorization: `Basic ${this.apiAuthToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const jsonText = JSON.stringify(response.data, null, 2);
                let dataUpdate = {
                    data: response.data,
                    status: order_1.OrderStatus.COMPLETED
                };
                orderRepository.update(order.id, dataUpdate);
                email_service_1.EmailService.send(process.env.LIST_EMAILS, 'Confirmando pedido', `pedido aceito\n ${jsonText}`);
                return response.data;
            }
            catch (error) {
                orderRepository.update(order.id, {
                    status: order_1.OrderStatus.ERROR,
                    dataError: (0, axiosErrorHandler_1.serializeError)(error)
                });
                return (0, axiosErrorHandler_1.handleAxiosError)(error);
            }
        });
    }
}
exports.ConfirmOrderService = ConfirmOrderService;
