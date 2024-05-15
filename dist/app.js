"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./models/server");
require("dotenv").config();
const server = new server_1.ServerServer();
server.execute();
