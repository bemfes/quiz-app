import { Categories, DifficultyLevels, TypesAnswer } from "../../../generalTypes";

export interface InitialState {
  score: number;
  questionNumber: number;
  endQuiz: boolean;
  loading: boolean;
  error: null | string;
  questions: QuestionsState[];
  userClick: boolean;
  userAnswer: string | null;
  userAnswersArray: string[];
}

export interface fetchQuestionsArgs {
  number: string;
  category: Categories;
  difficulty: DifficultyLevels;
  type: TypesAnswer;
}

export interface Questions {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionsState = Questions & { answers: string[] };

export interface ErrorPayload {
  message: string;
}

