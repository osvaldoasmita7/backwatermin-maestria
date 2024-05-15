"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const rules_1 = require("../rules/rules");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
/**
 * Path: api/login
 */
const { validationModels } = require("../middlewares/validationModels");
const router = (0, express_1.Router)();
// Endpoint
/**
 * Iniciar sesión
 * POST: api/login
 */
router.post("/login", jsonParser, validationModels, rules_1.loginRule, auth_1.Login);
router.post("/register", jsonParser, validationModels, rules_1.loginRule, auth_1.Register);
exports.authRoutes = router;
