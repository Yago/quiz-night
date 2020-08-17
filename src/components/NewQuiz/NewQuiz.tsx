/** @jsx jsx */
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

import { button, form } from 'styles';

interface Props {
  onSubmit(name: string | undefined): void;
}

const NewQuiz = ({ onSubmit }: Props): JSX.Element => {
  const input = useRef<HTMLInputElement>(null);
  const [t] = useTranslation();

  return (
    <form
      tw="flex"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(input?.current?.value);
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <input
        type="text"
        ref={input}
        css={form.input}
        tw="mr-3"
        placeholder={t('quiz_name')}
      />
      <button
        type="button"
        onClick={() => onSubmit(input?.current?.value)}
        css={button.primary}
      >
        {t('add')}
      </button>
    </form>
  );
};

NewQuiz.defaultProps = {};

export default NewQuiz;
