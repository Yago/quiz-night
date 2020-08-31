/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { AnimatePresence, motion } from 'framer-motion';
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { Quiz, Timer } from 'types';

import { n } from 'utils';

interface Props {
  quiz: Quiz | null;
  time: Timer;
  onSelect(score: number): void;
  onAnswer(answer: number): void;
}

const Question = ({ quiz, time, onSelect, onAnswer }: Props): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null);
  const question = quiz?.questions?.[time?.currentQuestion - 1];
  const openingDeduction = n(quiz?.questionsOpeningDuration) * 1000;
  const maxScore = n(quiz?.questionsDuration) * 1000;

  useEffect(() => {
    if (!isNil(selected)) {
      onAnswer(selected);
      const isCorrect = n(question?.correct) === selected;
      const newScore = Math.round(
        (maxScore - time.duration + openingDeduction) / 10
      );
      onSelect(isCorrect ? newScore : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => setSelected(null), [quiz]);

  return (
    <div tw="flex flex-col flex-auto h-full">
      <div
        tw="bg-gray-300 flex-auto flex items-center px-6"
        css={{ height: '50%' }}
      >
        <h1 tw="text-2xl md:text-4xl font-bold w-full text-center">
          {question?.title}
        </h1>
      </div>

      <div
        tw="flex flex-wrap flex-auto border border-gray-400"
        css={{ height: '50%' }}
      >
        <AnimatePresence>
          {time.duration >= openingDeduction &&
            question?.answers?.map((answer, i) => (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ diration: 0.2 }}
                key={`answer-${time?.currentQuestion - 1}-${i}`}
                type="button"
                tw="w-1/2 border-2 border-gray-400 duration-200 transition-colors"
                css={[
                  !isNil(selected) && selected === i
                    ? tw`bg-gray-700 text-white`
                    : tw`bg-white`,
                  !isNil(selected) && tw`cursor-default`,
                ]}
                disabled={!isNil(selected)}
                onClick={() => setSelected(i)}
              >
                {answer}
              </motion.button>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

Question.defaultProps = {
  onSelect: console.log,
};

export default Question;
