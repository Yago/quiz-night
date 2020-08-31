/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { Player, Quiz, Session, Timer } from 'types';

import { db } from 'services/firebase';
import { n } from 'utils';

interface Props {
  session: Session | null;
  quiz: Quiz | null;
  time: Timer | null | undefined;
  lastAnswer: number | null;
}

const Question = ({ quiz, session, time, lastAnswer }: Props): JSX.Element => {
  const question = !isNil(time?.currentQuestion)
    ? quiz?.questions?.[(time as Timer).currentQuestion - 1]
    : null;
  const [players] = useCollectionData(
    db
      .doc(`sessions/${session?.id}`)
      .collection('players')
      .orderBy('score', 'desc')
  );
  const { t } = useTranslation();

  return (
    <div tw="flex flex-col flex-auto h-full">
      <div
        tw="bg-gray-300 flex-auto flex flex-col items-center justify-center px-6"
        css={{ height: '50%' }}
      >
        <h1 tw="text-2xl md:text-4xl font-bold w-full text-center">
          {question?.title}
          <br />
          <span tw="text-green-600">
            {question?.answers?.[n(question?.correct)]} 🎉
          </span>
        </h1>

        <span tw="pt-4">
          {t('your_answer')}:{' '}
          <span
            css={
              n(question?.correct) === lastAnswer
                ? tw`text-green-600`
                : tw`text-red-600`
            }
          >
            {question?.answers?.[lastAnswer as number]}
          </span>
        </span>
      </div>

      <div
        tw="flex-auto overflow-hidden p-6"
        className="fade-bottom"
        css={{ height: '50%' }}
      >
        {!isNil(players) && (
          <table tw="min-w-full">
            {(players as Player[])?.map((player, i) => (
              <tr key={`player-${player.id}`}>
                <td>{i + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Question;
