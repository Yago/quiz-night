/** @jsx jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import PropTypes from 'prop-types';
import { prop, sortBy } from 'ramda';
import tw from 'twin.macro';

const ReadyScreen = ({ quiz, session }) => {
  const [t] = useTranslation();
  return (
    <div tw="container mx-auto p-6">
      <h1 tw="text-4xl font-bold">{quiz?.title}</h1>

      <p tw="mt-4">{t('will_start_soon')}</p>

      <h2 tw="text-xl font-bold mt-4">{t('players')}</h2>

      <ul tw="mt-2">
        {sortBy(prop('name'), session?.players)?.map(player => (
          <li key={`player-${player.id}`}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

ReadyScreen.propTypes = {
  quiz: PropTypes.object,
  session: PropTypes.object,
};
ReadyScreen.defaultProps = {};

export default ReadyScreen;
