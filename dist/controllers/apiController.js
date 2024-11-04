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
exports.formatPhone = exports.confirmOrder = exports.orderValidate = exports.MenuCategories = void 0;
const menu_service_1 = require("../services/menu.service");
const orderValidation_service_1 = require("../services/orderValidation.service");
const confirmOrder_service_1 = require("../services/confirmOrder.service");
const phone_service_1 = require("../services/phone.service");
const MenuCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuFoodtec = new menu_service_1.MenuService(req, res);
    try {
        const result = yield menuFoodtec.handle();
        res.json(result);
    }
    catch (error) {
        console.log(error.response);
        const errorMessage = error.response
            ? error.response.data
            : error.message;
        const resultObject = [
            {
                toolCallId: menuFoodtec.vapiId,
                result: errorMessage,
            },
        ];
        const returnToVapi = {
            results: resultObject,
        };
        console.error("Detalhes do erro:", errorMessage);
        res.status(error.response.status).json(returnToVapi);
    }
});
exports.MenuCategories = MenuCategories;
const orderValidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateFoodtec = new orderValidation_service_1.OrderValidationService(req, res);
    try {
        const result = yield validateFoodtec.handle();
        res.json(result);
    }
    catch (error) {
        console.log(error.response);
        const errorMessage = error.response
            ? error.response.data
            : error.message;
        const resultObject = [
            {
                toolCallId: validateFoodtec.vapiId,
                result: errorMessage,
            },
        ];
        const returnToVapi = {
            results: resultObject,
        };
        console.error("Detalhes do erro:", errorMessage);
        res.status(error.response.status).json(returnToVapi);
    }
});
exports.orderValidate = orderValidate;
const confirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmOrder = new confirmOrder_service_1.ConfirmOrderService(req, res);
    try {
        const result = yield confirmOrder.handle();
        res.json(result);
    }
    catch (error) {
        console.log(error.response);
        const errorMessage = error.response
            ? error.response.data
            : error.message;
        const resultObject = [
            {
                toolCallId: confirmOrder.vapiId,
                result: errorMessage,
            },
        ];
        const returnToVapi = {
            results: resultObject,
        };
        console.error("Detalhes do erro:", errorMessage);
        res.status(error.response.status).json(returnToVapi);
    }
});
exports.confirmOrder = confirmOrder;
const formatPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuFoodtec = new phone_service_1.PhoneService(req, res);
        const result = yield menuFoodtec.handle();
        res.json(result);
    }
    catch (error) {
        console.log(error.response);
        const errorMessage = error.response
            ? error.response.data
            : error.message;
        console.error("Detalhes do erro:", errorMessage);
        res.status(error.response.status).json({ data: errorMessage });
    }
});
exports.formatPhone = formatPhone;
