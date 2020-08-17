/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core'; // eslint-disable-line
import QRCode from 'qrcode.react';
import { compose, isNil, prop, sortBy, toLower } from 'ramda';
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
    <div tw="absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-between p-6 text-center">
      <div>
        <h1 tw="text-5xl font-bold">{quiz?.title}</h1>
        <p tw="mt-4 md:text-xl">{t('will_start_soon')}</p>
      </div>

      <div>
        <QRCode
          value={process.env.BASE_URL as string}
          size={1000}
          tw="w-1/2 h-auto mx-auto mt-12"
          renderAs="svg"
          css={css`
            max-height: 50vh;
          `}
        />
        <p tw="text-2xl md:text-4xl text-green-500 font-bold font-heading mt-8">
          {process.env.BASE_URL}
        </p>
      </div>

      <div>
        <h2 tw="text-xl font-bold mt-8">{t('players')}</h2>
        {!isNil(players) && (
          <ul tw="mt-2 flex flex-wrap justify-center">
            {sortBy(compose(toLower, prop('name')), players as Player[])?.map(
              player => (
                <li key={`player-${player.id}`} tw="mr-6">
                  {player.name}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

ReadyScreen.defaultProps = {};

export default ReadyScreen;
