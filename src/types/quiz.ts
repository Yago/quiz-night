export interface Question {
  answers: string[];
  correct: string;
  title: string;
}

export interface Quiz {
  breaksDuration: string;
  questions: Question[];
  questionsDuration: string;
  questionsOpeningDuration: string;
  slug: string;
  title: string;
}
