import {
  differenceInMilliseconds,
  // differenceInMinutes,
  // differenceInSeconds,
  fromUnixTime,
  isAfter,
} from 'date-fns';
import { isEmpty, isNil } from 'ramda';

const leadingZero = nbr => String(nbr).padStart(2, '0');
const toDate = date => fromUnixTime(date / 1000);
const n = str => parseInt(str, 10);

export default (session, quiz) => {
  if (isNil(session) || isEmpty(session) || isNil(quiz) || isEmpty(quiz)) {
    return null;
  }

  // const { startDate, pauseDate, resumeDate, endDate } = session;
  const { endDate } = session;
  const { questionsDuration, breaksDuration } = quiz;
  const questions = quiz?.questions?.length || 0;

  const remainingTime =
    differenceInMilliseconds(new Date(), toDate(endDate)) * -1;
  const questionsBreaksDuration =
    (n(questionsDuration) + n(breaksDuration)) * 1000;
  const remainingQuestionsBreaks = remainingTime / questionsBreaksDuration;

  const questionRatio =
    n(questionsDuration) / (n(questionsDuration) + n(breaksDuration));

  const isQuestion = remainingQuestionsBreaks % 1 <= questionRatio;
  const currentQuestion = questions - Math.floor(remainingQuestionsBreaks);
  const currentBreak = currentQuestion - 1;

  const remainingTotalTime =
    remainingTime -
    Math.floor(remainingQuestionsBreaks) * questionsBreaksDuration;
  const remainingCurrentTime = isQuestion
    ? remainingTotalTime
    : remainingTotalTime - n(questionsDuration) * 1000;

  const minutes = Math.floor(remainingCurrentTime / 1000 / 60);
  const seconds = Math.floor((remainingCurrentTime / 1000) % 60);
  const timer = `${leadingZero(minutes)}:${leadingZero((seconds % 60) + 1)}`;

  // const minutes2 = differenceInMinutes(new Date(), toDate(endDate)) * -1;
  // const seconds2 = differenceInSeconds(new Date(), toDate(endDate)) * -1;
  // const timer2 = `${leadingZero(minutes2)}:${leadingZero(seconds2 % 60)}`;

  const isCompleted = isAfter(new Date(), toDate(endDate));

  return {
    isQuestion,
    currentQuestion,
    currentBreak,
    timer,
    // timer2,
    isCompleted,
  };
};
