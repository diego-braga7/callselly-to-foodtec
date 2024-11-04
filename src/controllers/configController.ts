import { Request, Response } from "express";
import { PhoneService } from "../services/phone.service";
import { EmailService } from "../services/email.service";


export const enviaEmail = async (req: Request, res: Response) => {
  try {

    EmailService.send('diego@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');
    EmailService.send('paulo@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');
    EmailService.send('pedro@callselly.com', 'Teste Email', 'Corpo do e-mail em texto simples', '<h1>Gonzo fuma paiero</h1>');

    res.json("Sucesso");

  } catch (error: any) {
   

    console.error("Detalhes do erro:", error);

    res.status(error.response.status).json({ data: "Falha ao enviar o e-mail" });
  }
  
};