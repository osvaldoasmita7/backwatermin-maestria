import { authRoutes } from "../routes/auth";
import { companiesRoutes } from "../routes/companies";
import { invoicesRoutes } from "../routes/invoice";
import { Sockets } from "./sockets";

//Servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
// const logger = require("morgan");
// const bodyParser = require("body-parser");
export class ServerServer {
  app = express();
  port = 0;
  server = http.createServer(this.app);
  // Configuraciones de sockets
  io = socketio(this.server, {
    /*Configuraciones */
  });
  constructor() {
    this.app = express();
    this.port = parseInt("3000");
    // dbConnection();
    // Http server
    this.server = http.createServer(this.app);
    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /*Configuraciones */
    });
  }

  configurationSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // // Habilitar cors
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
        allowedHeaders: "*",
      })
    );
    // // Parseo del body
    this.app.use(express.json());
    /**
     * Habilita los endpoint:
     * APIEndpoints
     */
    this.app.use("/api/auth", authRoutes);
    // Pedidos
    this.app.use("/api/invoices", invoicesRoutes);

    //Empresas
    this.app.use("/api/companies", companiesRoutes);
    // //Users Cedis
    // this.app.use("/api/users-cedis/", require("../router/users_cedis"));
    // //viajes
    // this.app.use("/api/viajes", require("../router/viaje"));
    // //choferes
    // this.app.use("/api/choferes", require("../router/choferes"));
    // //tripulacion
    // this.app.use("/api/tripulacion", require("../router/tripulacion"));
    // //tripulacion
    // this.app.use("/api/checkPrueba", require("../router/checkPruebas"));
    // // Estatus
    // this.app.use("/api/estatus", require("../router/estatus"));
    // // Tiendas
    // this.app.use("/api/tiendas", require("../router/tiendas"));
    // // Rutas
    // this.app.use("/api/rutas", require("../router/rutas"));
    // //Unidades
    // this.app.use("/api/unidades", require("../router/unidades"));
    // // Bitacora
    // this.app.use("/api/bitacora", require("../router/bitacora"));
    // // Negocios
    // this.app.use("/api/negocios", require("../router/negocios"));
    // // Denegaciones-viaje
    // this.app.use(
    //   "/api/denegaciones-viaje",
    //   require("../router/denegaciones_viaje")
    // );
    // // Logs
    // this.app.use("/api/logs", require("../router/logs"));
  }

  execute() {
    //   Inicializar middlewares
    this.middlewares();
    // Inicializar sockets
    this.configurationSockets();
    // Inicializar server
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto : ${this.port}`);
    });
  }
}
