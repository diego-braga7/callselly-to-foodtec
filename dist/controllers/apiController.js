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
exports.MenuCategories = exports.getDataFromAnotherAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const apiUrl = process.env.URL_FOODTEC;
const apiUsername = process.env.USERNAME_FOODTEC;
const apiPassword = process.env.PASSWORD_FOODTEC;
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64");
const getDataFromAnotherAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.exemplo.com/endpoint");
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao acessar API externa" });
    }
});
exports.getDataFromAnotherAPI = getDataFromAnotherAPI;
const MenuCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let { category, items, orderType } = req.body;
    if (orderType == undefined) {
        orderType = "Delivery";
    }
    let baseUrl = apiUrl + `/ws/store/v1/menu/categories/${category}?orderType=${orderType}`;
    console.log(items);
    if (items) {
        baseUrl = apiUrl + `/ws/store/v1/menu/categories/${category}/items/${items}?orderType=${orderType}`;
    }
    console.log(baseUrl);
    try {
        const response = yield axios_1.default.get(baseUrl, {
            headers: {
                Authorization: `Basic ${apiAuthToken}`
            }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao acessar API externa" });
    }
});
exports.MenuCategories = MenuCategories;
