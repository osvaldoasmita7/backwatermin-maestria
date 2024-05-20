import { Socket } from "socket.io";
import { initModels } from "./db/init-models";
import { sequelizeConn } from "../connection/sequelizedb";
import { companiesAttributes } from "../interfaces";
const { companies } = initModels(sequelizeConn);
export class Sockets {
  io;
  _companies: companiesAttributes[] = [];
  constructor(io: any) {
    this.io = io;
    this.getCompanies();
  }
  getCompanies = async () => {
    this._companies = await companies.findAll();
    this.socketEvents();
  };
  socketEvents() {
    console.log(this._companies);
    //   On connection
    this.io.on("connection", async (socket: Socket) => {
      this.io.emit("conected_to_room", "Hola desde el back");
      //  Creamos las salas

      for (const company of this._companies) {
        socket.on(`my_company_${company!.id}`, (payload: any) => {
          console.log(payload);
        });
      }
      socket.on(`my_company_1`, (payload: any) => {
        console.log(payload);
      });
      this.io.on(`my_company_1`, (payload: any) => {
        console.log(payload);
      });
      this.io.on(
        this._companies.map((company) => `my_company_${company.id}`),
        (payload: any) => {
          console.log(payload);
        }
      );
    });
    //  Creamos las salas
    this.io.on(
      this._companies.map((company) => `my_company_${company.id}`),
      (payload: any) => {
        console.log(payload);
      }
    );
    this.io.on(`my_company_1`, (payload: any) => {
      console.log(payload);
    });
    this.io.on("disconnect", async (socket: Socket) => {
      // console.log("Ok, alguien se desconectó");
    });
  }
}
