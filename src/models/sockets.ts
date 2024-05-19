import { Socket } from "socket.io";

export class Sockets {
  io;
  constructor(io: any) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    //   On connection
    this.io.on("connection", async (socket: Socket) => {
      // console.log("Ok, alguien se conectó");
      // socket.on("my_company_1", async () => {
      //   socket.join("my_company_1");
      //   // this.io.emit("conected_to_room", {
      //   //   // console.log("Conectado 212");
      //   //   ok: true,
      //   //   message: "Connected",
      //   // });
      //   // socket.emit("conected_to_room", () => {
      //   //   console.log("Conectado 21");
      //   //   return { ok: true, message: "Connected" };
      //   // });
      //   // this.io.to("conected_to_room").emit("conected_to_room", () => {
      //   //   console.log("Conectado 3");
      //   //   return { ok: true, message: "Connected" };
      //   // });
      // });

      this.io.emit("conected_to_room", "Hola desde el back");
    });
    this.io.on("disconnect", async (socket: Socket) => {
      // console.log("Ok, alguien se desconectó");
    });
    // this.io.on("my_company_1", async (socket: Socket) => {
    //   socket.emit("conected_to_room", () => {
    //     console.log("Conectado 2");
    //     return { ok: true, message: "Connected" };
    //   });
    //   // console.log("Ok, alguien se desconectó");
    // });
  }
}
