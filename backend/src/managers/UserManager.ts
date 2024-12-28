import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";

export class UserManager {
  private quizManager: QuizManager;

  constructor() {
    this.quizManager = new QuizManager();
  }

  addUser(socket: Socket) {
    this.createHandler(socket);
  }

  private createHandler(socket: Socket) {
    socket.on("join", (data) => {
      const userId = this.quizManager.addUser(data.roomId, data.name);
      socket.emit("init", {
        userId,
        state: this.quizManager.getCurrentState(data.roomId),
      });
      socket.join(data.roomId);
    });

    socket.on("joinAdmin", (data) => {
      if (data.password !== "ADMIN_PASSWORD") {
        return;
      }

      socket.on("createQuiz", (data) => {
        this.quizManager.addQuiz(data.roomID);
      });

      socket.on("addProblem", (data) => {
        this.quizManager.addProblem(data.roomID, data.problem);
      });

      socket.on("next", (data) => {
        this.quizManager.next(data.roomID);
      });
    });

    socket.on("submit", (data) => {
      const userId = data.userId;
      const roomID = data.roomID;
      const submission = data.submission;
      const problemId = data.problemId;

      if (
        submission != 0 &&
        submission != 1 &&
        submission != 2 &&
        submission != 3
      ) {
        console.error("issue while getting input " + submission);
        return;
      }

      this.quizManager.submit(userId, roomID, problemId, submission);
    });
  }
}
