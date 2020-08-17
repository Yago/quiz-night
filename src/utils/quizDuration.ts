import { isNil } from 'ramda';
import { Quiz } from 'types';

import { n } from 'utils';

export default (quiz: Quiz): number => {
  if (isNil(quiz)) return 0;

  const questions = quiz.questions.length;
  const questionsDuration =
    n(quiz.questionsDuration) * 1000 + n(quiz.questionsOpeningDuration) * 1000;
  const breaksDuration = n(quiz.breaksDuration) * 1000;

  return (questionsDuration + breaksDuration) * questions;
};
