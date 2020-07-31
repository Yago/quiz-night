/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import Question from 'components/Question';
import Results from 'components/Results';

const Game = ({ time, session, quiz }) => (
  <div tw="flex flex-col absolute top-0 bottom-0 right-0 left-0">
    <h1 tw="text-4xl font-bold mb-4">
      {!isNil(time?.timer) && time?.timer}

      {!session.isPlaying && ' Pause'}
    </h1>

    <div tw="flex-1 h-full">
      {!isNil(time?.isQuestion) && time?.isQuestion && (
        <Question quiz={quiz} time={time} />
      )}

      {!isNil(time?.isQuestion) && !time?.isQuestion && (
        <Results quiz={quiz} session={session} time={time} />
      )}
    </div>

    {/* {!isNil(time?.timer2) && (
      <h1 tw="text-4xl font-bold mb-4">{time?.timer2}</h1>
    )} */}
  </div>
);

Game.propTypes = {
  time: PropTypes.object,
  quiz: PropTypes.object,
  session: PropTypes.object,
};

Game.defaultProps = {};

export default Game;
