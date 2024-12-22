import { IoManager } from "./managers/IoManager.js";
import { UserManager } from "./managers/UserManager.js";
const io = IoManager.getIo();
io.listen(3000);
const userManager = new UserManager();
io.on("connection", (socket) => {
    console.log("Server Connected");
    userManager.addUser(socket);
});
