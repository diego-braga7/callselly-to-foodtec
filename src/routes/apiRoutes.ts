import { Router, Request, Response } from "express";
import { getDataFromAnotherAPI } from "../controllers/apiController";

const router: Router = Router();

router.get("/data", getDataFromAnotherAPI);

export default router;
