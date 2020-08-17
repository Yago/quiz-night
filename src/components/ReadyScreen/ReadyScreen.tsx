/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { isNil, prop, sortBy } from 'ramda';
import tw from 'twin.macro';
import { Player, Quiz, Session } from 'types';

import { db } from 'services/firebase';

interface Props {
  session: Session | null;
  quiz: Quiz | null;
}

const ReadyScreen = ({ quiz, session }: Props): JSX.Element => {
  const [t] = useTranslation();
  const [players] = useCollectionData(
    db.doc(`sessions/${session?.id}`).collection('players').orderBy('name')
  );

  return (
    <div tw="container mx-auto p-6">
      <h1 tw="text-4xl font-bold">{quiz?.title}</h1>

      <p tw="mt-4">{t('will_start_soon')}</p>

      <h2 tw="text-xl font-bold mt-4">{t('players')}</h2>

      {!isNil(players) && (
        <ul tw="mt-2">
          {sortBy(prop('name'), players as Player[])?.map(player => (
            <li key={`player-${player.id}`}>{player.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

ReadyScreen.defaultProps = {};

export default ReadyScreen;
