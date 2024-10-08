import { Router, Request, Response } from "express";
import { MenuCategories, getDataFromAnotherAPI } from "../controllers/apiController";

const router: Router = Router();

router.get("/data", getDataFromAnotherAPI);
router.get("/menu/categories", MenuCategories);

export default router;
