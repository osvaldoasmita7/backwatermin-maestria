import { ServerServer } from "./models/server";
require("dotenv").config();
const server = new ServerServer();
server.execute();


module.exports={server}