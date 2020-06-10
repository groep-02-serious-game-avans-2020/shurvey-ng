import { Question } from './question';
import { Answer } from './answer';

export class Survey {
  // tslint:disable-next-line: variable-name
  _id: string;
  title: string;
  questions: Question[];
  answers: Answer[];
}
