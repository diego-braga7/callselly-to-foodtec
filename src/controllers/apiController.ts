import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "https://dedhamlab.foodtecsolutions.com";
const apiUsername = "apiclient";
const apiPassword = "6SWXRaX8mBe48qH";
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
  "base64",
);
export const getDataFromAnotherAPI = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.exemplo.com/endpoint");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao acessar API externa" });
  }
};

export const MenuCategories = async (req: Request, res: Response) => {
  console.log(req.body);

  let { category, items, orderType } = req.body;

  if (orderType == undefined) {
    orderType = "Delivery";
  }
  let baseUrl = apiUrl + `/ws/store/v1/menu/categories`;

  if (category) {
    baseUrl = baseUrl + `/${category}`;
  }

  console.log(items);

  if (category && items) {
    baseUrl = baseUrl + `/items/${items}`;
  }

  baseUrl = baseUrl + `?orderType=${orderType}`;
  console.log(baseUrl);
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Basic ${apiAuthToken}`,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    // Verifica se o erro tem uma resposta da API e captura a mensagem
    const errorMessage = error.response
      ? `Erro: ${error.response.status} - ${error.response.statusText}`
      : error.message;

    console.error("Detalhes do erro:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao acessar API externa", error: errorMessage });
  }
};
