import { Quiz } from "../Quiz.js";
let globalProblemId = 0;
export class QuizManager {
  constructor() {
    this.quizzes = [];
  }
  start(roomId) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.start();
  }
  addProblem(problem, roomId) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.addProblem(
      Object.assign(Object.assign({}, problem), {
        id: (globalProblemId++).toString(),
        startTime: new Date().getTime(),
        submissions: [],
      })
    );
  }
  next(roomId) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.next();
  }
  addUser(name, roomId) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.addUser(name);
  }
  submit(roomId, problemId, userId, submission) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No Quiz Found");
      return;
    }
    quiz.submit(userId, roomId, problemId, submission);
  }
  getQuiz(roomId) {
    var _a;
    return (_a = this.quizzes.find((item) => item.roomId === roomId)) !==
      null && _a !== void 0
      ? _a
      : null;
  }
  getCurrentState(roomId) {
    const quiz = this.quizzes.find((x) => x.roomId === roomId);
    if (!quiz) {
      return null;
    }
    return quiz.getCurrentState();
  }
  addQuiz(roomId) {
    if (this.getQuiz(roomId)) {
      return;
    }
    const quiz = new Quiz(roomId);
    this.quizzes.push(quiz);
  }
}
