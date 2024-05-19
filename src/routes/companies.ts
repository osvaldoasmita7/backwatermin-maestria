import { Router } from "express";
import { getAllCompanies } from "../controllers/companies";

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
router.get("/", jsonParser, validationModels, getAllCompanies);

export const companiesRoutes = router;
