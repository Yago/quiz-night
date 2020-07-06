import { isNil } from 'ramda';

export default quiz => {
  if (isNil(quiz)) return 0;

  const questions = quiz.questions.length;
  const questionsDuration = parseInt(quiz.questionsDuration, 10) * 1000;

  const breaks = questions - 1;
  const breaksDuration = quiz.breaksDuration * 1000;

  return questionsDuration * questions + breaks * breaksDuration;
};
