import {
  differenceInMilliseconds,
  // differenceInMinutes,
  // differenceInSeconds,
  fromUnixTime,
  isAfter,
} from 'date-fns';
import { isEmpty, isNil } from 'ramda';
import { Quiz, Session, Timer } from 'types';

import { n } from 'utils';

const leadingZero = (nbr: number): string => String(nbr).padStart(2, '0');
const toDate = (date: number): Date => fromUnixTime(date / 1000);

export default (session: Session, quiz: Quiz): Timer | null => {
  if (isNil(session) || isEmpty(session) || isNil(quiz) || isEmpty(quiz)) {
    return null;
  }

  const { endDate } = session;
  const { questionsDuration, questionsOpeningDuration, breaksDuration } = quiz;
  const questions = quiz?.questions?.length || 0;

  const remainingTime =
    differenceInMilliseconds(new Date(), toDate(endDate)) * -1;
  const questionsBreaksDuration =
    (n(questionsDuration) + n(questionsOpeningDuration) + n(breaksDuration)) *
    1000;
  const remainingQuestionsBreaks = remainingTime / questionsBreaksDuration;

  const breakRatio =
    n(breaksDuration) /
    (n(questionsDuration) + n(questionsOpeningDuration) + n(breaksDuration));

  const isQuestion = remainingQuestionsBreaks % 1 > breakRatio;
  const currentQuestion = questions - Math.floor(remainingQuestionsBreaks);
  const currentBreak = currentQuestion;

  const remainingTotalTime =
    remainingTime -
    Math.floor(remainingQuestionsBreaks) * questionsBreaksDuration;
  const remainingCurrentTime = isQuestion
    ? remainingTotalTime - n(breaksDuration) * 1000
    : remainingTotalTime;

  const minutes = Math.floor(remainingCurrentTime / 1000 / 60);
  const seconds = Math.floor((remainingCurrentTime / 1000) % 60);
  const timer = `${leadingZero(minutes)}:${leadingZero((seconds % 60) + 1)}`;

  const duration = isQuestion
    ? (n(questionsDuration) + n(questionsOpeningDuration)) * 1000 -
      remainingCurrentTime
    : 0;

  // const minutes2 = differenceInMinutes(new Date(), toDate(endDate)) * -1;
  // const seconds2 = differenceInSeconds(new Date(), toDate(endDate)) * -1;
  // const timer2 = `${leadingZero(minutes2)}:${leadingZero(seconds2 % 60)}`;

  const isCompleted = isAfter(new Date(), toDate(endDate));

  return {
    isQuestion,
    currentQuestion,
    currentBreak,
    timer,
    duration,
    // timer2,
    isCompleted,
  };
};
