"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationModels = void 0;
const express_validator_1 = require("express-validator");
const validationModels = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({
            ok: false,
            error: errors.mapped(),
            status: 400,
        });
    }
    next();
};
exports.validationModels = validationModels;
