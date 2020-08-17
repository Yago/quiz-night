/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { Player, Quiz, Session, Timer } from 'types';

import { db } from 'services/firebase';

interface Props {
  session: Session | null;
  quiz: Quiz | null;
  time: Timer | null;
}

const Question = ({ quiz, session, time }: Props): JSX.Element => {
  const question = quiz?.questions?.[time?.currentQuestion || 0 - 1];
  const [players] = useCollectionData(
    db
      .doc(`sessions/${session?.id}`)
      .collection('players')
      .orderBy('score', 'desc')
  );
  return (
    <div tw="flex flex-col flex-auto h-full">
      <div
        tw="bg-gray-300 flex-auto flex items-center px-6"
        css={{ height: '50%' }}
      >
        <h1 tw="text-4xl font-bold w-full text-center">
          {question?.title}
          <br />
          <span tw="text-green-600">
            {question?.answers?.[parseInt(question?.correct, 10)]} 🎉
          </span>
        </h1>
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
