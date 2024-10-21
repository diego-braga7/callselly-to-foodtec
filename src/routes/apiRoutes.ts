import { Router, Request, Response } from "express";
import { MenuCategories, getDataFromAnotherAPI, orderValidate } from "../controllers/apiController";

const router: Router = Router();

router.get("/data", getDataFromAnotherAPI);
router.get("/menu/categories", MenuCategories);
router.post("/order/validate", orderValidate);

export default router;
