import { Request, Response } from "express";
import axios from "axios";

const apiUrl = process.env.URL_FOODTEC;
const apiUsername = process.env.USERNAME_FOODTEC;
const apiPassword = process.env.PASSWORD_FOODTEC;
const apiAuthToken = Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64");
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

  let baseUrl = apiUrl + `/ws/store/v1/menu/categories/${category}?orderType=${orderType}`;
  console.log(items);
  if (items) {
    baseUrl = apiUrl + `/ws/store/v1/menu/categories/${category}/items/${items}?orderType=${orderType}`;
  }
  console.log(baseUrl);
  try {
    const response = await axios.get(baseUrl,
      {
        headers: {
          Authorization: `Basic ${apiAuthToken}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao acessar API externa" });
  }
};



