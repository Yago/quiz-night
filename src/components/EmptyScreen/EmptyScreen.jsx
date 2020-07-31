/** @jsx jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

const EmptyScreen = () => {
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
        {t('nothing_here')}
      </p>
    </div>
  );
};

EmptyScreen.propTypes = {};
EmptyScreen.defaultProps = {};

export default EmptyScreen;