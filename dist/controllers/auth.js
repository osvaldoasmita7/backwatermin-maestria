"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Login = void 0;
const bcrypt = require("bcryptjs");
// Importamos middlewares
const auth_middleware_1 = require("../middlewares/auth.middleware");
// Importamos helpers
const JWT_1 = require("../helpers/JWT");
/**
 * Función para iniciar sesión
 * @param req
 * @param res
 * @returns
 */
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraemos parametros del body
        const { active, username, password } = req.body;
        // Traemos los usuarios de la base con el filtro
        const users = yield (0, auth_middleware_1.GetAllUsers)({ active, username });
        // Buscamos el que coincida con la contraseña
        const user = users.find((x) => bcrypt.compareSync(`${password}`, x.password));
        // Si no encontramos usuario
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El email y/o contraseña son incorrectos o el usuario no existe o tu cuenta se encuentra inhabilitada",
            });
        }
        // Si el usuario no está activo
        if (!user.active) {
            return res.status(404).json({
                ok: false,
                msg: "Tu cuenta se encuentra inhabilitada",
            });
        }
        // Generamos el token
        const token = yield (0, JWT_1.generateToken)(user.id || 0, user.username || "", user.type_id || 0, user.active || 0);
        // Retornamos la respuesta
        return res.json({
            ok: true,
            user: {
                name: user.username,
                id: user.id,
                type_id: user.type_id,
                token,
                active: user.active,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, hable con el administrador",
            error,
        });
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraemos parametros del body
        const { type_id, username, password, confirmPassword } = req.body;
        if (!password || !confirmPassword || password !== confirmPassword)
            return res.status(400).json({
                ok: false,
                message: "Las contraseñas no coinciden o la confirmación no la enviaste",
            });
        // Traemos los usuarios de la base con el filtro
        const users = yield (0, auth_middleware_1.GetAllUsers)({ username });
        // Si encontramos usuario
        if (users.length) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario ya se registró con anterioridad",
            });
        }
        const salt = bcrypt.genSaltSync();
        const passwordEncrypted = bcrypt.hashSync(`${password}`, salt);
        const resp = yield (0, auth_middleware_1.CreateUser)({
            username,
            password: passwordEncrypted,
            type_id,
        });
        if (!resp)
            return res.status(500).json({
                msg: "Ocurrió un problema, intenta más tarde",
                ok: false,
                error: resp,
            });
        // Generamos el token
        const token = yield (0, JWT_1.generateToken)(resp.id || 0, resp.username || "", resp.typeId || 0, resp.active || 0);
        // Retornamos la respuesta
        return res.json({
            ok: true,
            user: {
                name: resp.username,
                id: resp.id,
                type_id: resp.type_id,
                token,
                active: resp.active,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, hable con el administrador",
            error,
        });
    }
});
exports.Register = Register;
