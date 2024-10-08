"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controllers/apiController");
const router = (0, express_1.Router)();
router.get("/data", apiController_1.getDataFromAnotherAPI);
router.get("/menu/categories", apiController_1.MenuCategories);
exports.default = router;
