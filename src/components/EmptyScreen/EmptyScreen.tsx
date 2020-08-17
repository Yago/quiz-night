/** @jsx jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

const EmptyScreen = (): JSX.Element => {
  const [t] = useTranslation();

  return (
    <div
      tw="
        w-full
        h-screen
        flex
        justify-center
        items-center
        text-center
      "
    >
      <p tw="p-10">
        <span tw="text-6xl">🤷‍♀️</span>
        <br />
        <span tw="text-2xl font-heading">{t('nothing_here')}</span>
      </p>
    </div>
  );
};

EmptyScreen.defaultProps = {};

export default EmptyScreen;
