export class Survey {
  // tslint:disable-next-line: variable-name
  _id: string;
  title: string;
  questions: Question[];
  answers: Answer[];
}

export class Question {
  questionNumber: number;
  question: string;
  textAnswer: boolean;
}

export class Answer {
  questionNumber: number;
  textAnswer: string;
  numberAnswer: number;
}
