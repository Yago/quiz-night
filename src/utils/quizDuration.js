import { isNil } from 'ramda';

import { n } from 'utils';

export default quiz => {
  if (isNil(quiz)) return 0;

  const questions = quiz.questions.length;
  const questionsDuration = n(quiz.questionsDuration) * 1000;
  const breaksDuration = n(quiz.breaksDuration) * 1000;

  return (questionsDuration + breaksDuration) * questions;
};
