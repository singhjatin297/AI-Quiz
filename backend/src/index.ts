import { IoManager } from "./managers/IoManager.js";
import { UserManager } from "./managers/UserManager.js";
import { Socket } from "socket.io";

const io = IoManager.getIo();

io.listen(3000);

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("Server Connected");
  userManager.addUser(socket);
});
