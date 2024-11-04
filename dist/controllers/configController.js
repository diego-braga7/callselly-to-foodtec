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
exports.enviaEmail = void 0;
const email_service_1 = require("../services/email.service");
const enviaEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        email_service_1.EmailService.send('diego@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');
        email_service_1.EmailService.send('paulo@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');
        email_service_1.EmailService.send('pedro@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');
        res.json("Sucesso");
    }
    catch (error) {
        console.error("Detalhes do erro:", error);
        res.status(error.response.status).json({ data: "Falha ao enviar o e-mail" });
    }
});
exports.enviaEmail = enviaEmail;
