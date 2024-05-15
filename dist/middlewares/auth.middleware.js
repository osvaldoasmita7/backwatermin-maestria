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
exports.CreateUser = exports.GetAllUsers = void 0;
const init_models_1 = require("../models/db/init-models");
const sequelizedb_1 = require("../connection/sequelizedb");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { users } = (0, init_models_1.initModels)(sequelizedb_1.sequelizeConn);
const GetAllUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ type_id, username, active }) {
    let where = {};
    if (type_id)
        where = Object.assign(Object.assign({}, where), { type_id });
    if (username)
        where = Object.assign(Object.assign({}, where), { username });
    if (active !== null || active !== undefined)
        where = Object.assign(Object.assign({}, where), { username });
    return yield users.findAll({
        where,
    });
});
exports.GetAllUsers = GetAllUsers;
const CreateUser = (_b) => __awaiter(void 0, [_b], void 0, function* ({ type_id, username, active, password, }) {
    return yield users.create({
        type_id,
        username,
        active,
        password,
    });
});
exports.CreateUser = CreateUser;
