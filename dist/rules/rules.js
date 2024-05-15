"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRule = void 0;
const express_validator_1 = require("express-validator");
const loginRule = [
    (0, express_validator_1.check)("id", "Opcional").not().isInt().optional(),
    (0, express_validator_1.checkSchema)({
        username: { isString: true },
        password: { isString: true },
        type_id: { isNumeric: true },
        active: { isBoolean: true },
    }),
];
exports.loginRule = loginRule;
