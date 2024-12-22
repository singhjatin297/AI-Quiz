import { AllowedSubmissions, Quiz } from "../Quiz";
let globalProblemId = 0;

export class QuizManager {
  private quizzes: Quiz[];
  constructor() {
    this.quizzes = [];
  }

  public start(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.start();
  }

  public addProblem(
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
    roomId: string
  ) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.addProblem({
      ...problem,
      id: (globalProblemId++).toString(),
      startTime: new Date().getTime(),
      submissions: [],
    });
  }

  public next(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.next();
  }

  addUser(name: string, roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.addUser(name);
  }

  submit(
    roomId: string,
    problemId: string,
    userId: string,
    submission: 0 | 1 | 2 | 3
  ) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.submit(userId, roomId, problemId, submission);
  }

  getQuiz(roomId: string) {
    return this.quizzes.find((item) => item.roomId === roomId) ?? null;
  }

  getCurrentState(roomId: string) {
    const quiz = this.quizzes.find((x) => x.roomId === roomId);
    if (!quiz) {
      return null;
    }
    return quiz.getCurrentState();
  }
  addQuiz(roomId: string) {
    if (this.getQuiz(roomId)) {
      return;
    }
    const quiz = new Quiz(roomId);
    this.quizzes.push(quiz);
  }
}
