import { Router } from "express";
import { GetAllProducts } from "../controllers/products";

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
 * POST: api/companies
 */
router.get("/", jsonParser, validationModels, GetAllProducts);

export const productsRoutes = router;
