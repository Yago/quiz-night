/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import tw from 'twin.macro';

const Question = ({ quiz, time, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const question = quiz?.questions?.[time?.currentQuestion - 1];

  useEffect(() => {
    if (!isNil(selected)) onSelect(selected);
  }, [selected]);

  useEffect(() => setSelected(null), [quiz]);

  return (
    <div tw="flex flex-col flex-auto h-full">
      <div
        tw="bg-gray-300 flex-auto flex items-center px-6"
        css={{ height: '50%' }}
      >
        <h1 tw="text-4xl font-bold w-full text-center">{question?.title}</h1>
      </div>

      <div
        tw="flex flex-wrap flex-auto border border-gray-300"
        css={{ height: '50%' }}
      >
        {question?.answers?.map((answer, i) => (
          <button
            key={`answer-${i}`}
            type="button"
            tw="w-1/2 border-2"
            css={[
              selected === i ? tw`border-gray-700` : tw`border-gray-300`,
              isNil(selected) ? tw`hover:border-gray-700` : tw`cursor-default`,
            ]}
            disabled={!isNil(selected)}
            onClick={() => setSelected(i)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  quiz: PropTypes.object,
  time: PropTypes.object,
  onSelect: PropTypes.func,
};

Question.defaultProps = {
  onSelect: console.log,
};

export default Question;
