import { Router } from "express";
import { Login, Register, RenewToken } from "../controllers/auth";
import { loginRule } from "../rules/rules";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/**
 * Path: api/login
 */
const { validationModels } = require("../middlewares/validationModels");
const router = Router();
// Endpoint
/**
 * Iniciar sesión
 * POST: api/login
 */
router.post(
  "/login/renew",
  jsonParser,
  validationModels,
  loginRule,
  RenewToken
);
router.post("/login", jsonParser, validationModels, loginRule, Login);
router.post("/register", jsonParser, validationModels, loginRule, Register);

export const authRoutes = router;
