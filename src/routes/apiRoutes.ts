import { Router } from "express";
import { MenuCategories, orderValidate } from "../controllers/apiController";

const router: Router = Router();

router.get("/menu/categories", MenuCategories);
router.post("/order/validate", orderValidate);

export default router;
