"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeConn = void 0;
const Sequelize = require("sequelize");
exports.sequelizeConn = new Sequelize("waterdb", "root", "", {
    host: "localhost",
    dialect: "mysql",
}, { timestamps: false });
