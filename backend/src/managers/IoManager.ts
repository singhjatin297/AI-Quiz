import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

export class IoManager {
  private static io: Server;

  public static getIo() {
    if (!this.io) {
      this.io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
    }
    return this.io;
  }
}
