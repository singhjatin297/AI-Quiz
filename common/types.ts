export type AllowedSubmissions = 0 | 1 | 2 | 3;

export interface Submission {
  problemId: string;
  userId: string;
  isCorrect: boolean;
  optionSelected: AllowedSubmissions;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  image?: string;
  startTime: number;
  answer: AllowedSubmissions;
  options: {
    id: number;
    title: string;
  }[];
  submissions: Submission[];
}
