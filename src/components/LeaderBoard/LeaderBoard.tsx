/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { Player, Session } from 'types';

import { db } from 'services/firebase';

interface Props {
  session: Session | null;
}

const Question = ({ session }: Props): JSX.Element => {
  const [players] = useCollectionData(
    db
      .doc(`sessions/${session?.id}`)
      .collection('players')
      .orderBy('score', 'desc')
  );

  return (
    <div>
      {!isNil(players) && (
        <div tw="container mx-auto">
          <div tw="flex items-end p-5">
            {(players as Player[])?.slice(0, 3)?.map((player, i) => (
              <div
                key={`leader-${i}`}
                tw="relative w-1/3"
                css={[
                  i === 0 && tw`order-2 bg-green-600`,
                  i === 1 && tw`order-1 bg-green-500`,
                  i === 2 && tw`order-3 bg-green-400`,
                  i === 0 && { order: 2, height: '30vh' },
                  i === 1 && { order: 1, height: '20vh' },
                  i === 2 && { order: 3, height: '10vh' },
                ]}
              >
                <h1
                  tw="
                    absolute
                    top-full
                    left-0
                    w-full
                    pt-3
                    text-center
                    font-bold
                    text-2xl
                    leading-none
                  "
                >
                  {player.name} {i === 0 && '🎉'}
                  <br />
                  <span tw="text-lg">{player.score}</span>
                </h1>
              </div>
            ))}
          </div>

          <div tw="px-6">
            <table tw="table-fixed w-full mt-24">
              {(players as Player[])?.slice(3)?.map((player, i) => (
                <tr key={`player-${player.id}`}>
                  <td tw="w-12 border-b px-4 py-2 font-bold">{i + 4}</td>
                  <td tw="border-b px-4 py-2">{player.name}</td>
                  <td tw="border-b px-4 py-2 text-right">{player.score}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

Question.defaultProps = {};

export default Question;
