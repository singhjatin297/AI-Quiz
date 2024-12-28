import { Quiz, AllowedSubmission } from "../Quiz";
let globalProblemId = 0;

export class QuizManager {
  private quizes: Quiz[];

  constructor() {
    this.quizes = [];
  }

  public start(roomID: string) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) return;

    quiz.start();
  }

  public addProblem(
    roomID: string,
    problem: {
      title: string;
      description: string;
      image?: string;
      options: { id: number; title: string }[];
      answer: AllowedSubmission;
    }
  ) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }

    quiz.addProblem({
      ...problem,
      id: (globalProblemId++).toString(),
      startTime: Date.now(),
      submissions: [],
    });
  }

  public next(roomID: string) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }

    quiz.next();
  }

  public getQuiz(roomID: string) {
    return this.quizes.find((item) => item.roomID === roomID) ?? null;
  }

  public submit(
    userId: string,
    roomID: string,
    problemId: string,
    submission: AllowedSubmission
  ) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }

    quiz.submit(userId, roomID, problemId, submission);
  }

  public getCurrentState(roomID: string) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }

    return quiz.getCurrentState();
  }

  addUser(roomID: string, name: string) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }

    quiz.addUser(name);
  }

  public addQuiz(roomID: string) {
    const quiz = this.getQuiz(roomID);
    if (!quiz) {
      return;
    }
  }
}
