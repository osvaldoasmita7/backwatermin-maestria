import { Router } from "express";
import {
  CreateInvoice,
  GetAllInvoice,
  GetInvoice,
  GetLastInvoice,
  UpdateInvoice,
} from "../controllers/invoice";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/**
 * Path: api/login
 */
const { validationModels } = require("../middlewares/validationModels");
const router = Router();
// Endpoint
/**
 * Peridos
 * POST: api/invoices
 */
router.get("/last-invoice", jsonParser, validationModels, GetLastInvoice);

router.get("/:id", jsonParser, validationModels, GetInvoice);
router.get("/", jsonParser, validationModels, GetAllInvoice);
router.post("/", jsonParser, validationModels, CreateInvoice);
router.put("/", jsonParser, validationModels, UpdateInvoice);

export const invoicesRoutes = router;
