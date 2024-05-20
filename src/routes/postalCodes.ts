import { Router } from "express";
import { searchPostalCodes } from "../controllers/postalCodes";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/**
 * Path: api/login
 */
const { validationModels } = require("../middlewares/validationModels");
const router = Router();
// Endpoint
/**
 * Empresas
 * POST: api/postal-codes
 */
router.get("/", jsonParser, validationModels, searchPostalCodes);

export const postalCodesRoutes = router;
