import { Router } from "express";
import { confirmOrder, formatPhone, MenuCategories, orderValidate } from "../controllers/apiController";

const router: Router = Router();

router.post("/menu/categories", MenuCategories);
router.post("/order/validate", orderValidate);
router.post("/order/confirm", confirmOrder);
router.post("/customer/format-phone", formatPhone);

export default router;
