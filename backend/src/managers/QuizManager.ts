import { AllowedSubmissions, Quiz } from "../Quiz";
import { Socket } from "socket.io";
let globalProblemId = 0;

export class QuizManager {
  private quizes: Quiz[];
  constructor() {
    this.quizes = [];
  }

  public start(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      return;
    }
    quiz.start();
  }

  public addProblem(
    roomId: string,
    problem: {
      title: string;
      description: string;
      image?: string;
      options: {
        id: number;
        title: string;
      }[];
      answer: AllowedSubmissions;
    },
    socket: Socket
  ) {
    const quiz = this.getQuiz(roomId);
    console.log(`Quiz for roomId ${roomId}:`, quiz); // Add this line to check if a quiz is retrieved
    if (!quiz) {
      console.warn(`No quiz found for roomId ${roomId}`);
      return;
    }
    quiz.addProblem(
      {
        ...problem,
        id: (globalProblemId++).toString(),
        startTime: new Date().getTime(),
        submissions: [],
      },
      socket
    );
  }

  public next(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      return;
    }
    quiz.next();
  }

  addUser(roomId: string, name: string) {
    return this.getQuiz(roomId)?.addUser(name);
  }

  submit(
    userId: string,
    roomId: string,
    problemId: string,
    submission: 0 | 1 | 2 | 3
  ) {
    this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);
  }

  getQuiz(roomId: string) {
    return this.quizes.find((x) => x.roomId === roomId) ?? null;
  }

  getCurrentState(roomId: string) {
    const quiz = this.quizes.find((x) => x.roomId === roomId);
    if (!quiz) {
      return null;
    }
    return quiz.getCurrentState();
  }

  addQuiz(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (quiz) {
      console.log(`Quiz already exists for roomId: ${roomId}`);
      return;
    }
    console.log(`Adding new quiz for roomId: ${roomId}`);
    const newQuiz = new Quiz(roomId);
    this.quizes.push(newQuiz);
  }
}
