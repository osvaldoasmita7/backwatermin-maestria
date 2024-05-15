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
      console.log("Ok, alguien se conectó");
    });
    this.io.on("disconnect", async (socket: Socket) => {
      console.log("Ok, alguien se desconectó");
    });
  }
}
