/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { AnimatePresence, motion } from 'framer-motion';
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { Quiz, Session, Timer } from 'types';

import Question from 'components/Question';
import Results from 'components/Results';

interface Props {
  time: Timer | null;
  quiz: Quiz | null;
  session: Session | null;
  onScore(score: number): void;
}

const Game = ({ time, session, quiz, onScore }: Props): JSX.Element => {
  const [lastAnswer, setLastAnswer] = useState<number | null>(null);

  return (
    <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0">
      <h1 tw="text-xl font-bold text-center bg-green-600 text-white">
        {!isNil(time?.timer) && session?.isPlaying && time?.timer}
        {!session?.isPlaying && '⏸'}
        &nbsp;
      </h1>

      <div tw="relative flex flex-col flex-auto h-full">
        <AnimatePresence>
          {!isNil(time?.isQuestion) && time?.isQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ diration: 0.2 }}
              tw="absolute top-0 left-0 bottom-0 right-0"
            >
              <Question
                quiz={quiz}
                time={time}
                onSelect={onScore}
                onAnswer={setLastAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isNil(time?.isQuestion) && !time?.isQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ diration: 0.2 }}
              tw="absolute top-0 left-0 bottom-0 right-0"
            >
              <Results
                quiz={quiz}
                session={session}
                time={time}
                lastAnswer={lastAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* {!isNil(time?.timer2) && (
      <h1 tw="text-4xl font-bold mb-4">{time?.timer2}</h1>
    )} */}
    </div>
  );
};

Game.defaultProps = {
  onScore: console.log,
};

export default Game;
