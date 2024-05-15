"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const generateToken = (id, username, type_id, active) => {
    return new Promise((resolve, reject) => {
        let payload = { username, id, type_id, active };
        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" }, function (error, token) {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateToken = generateToken;
