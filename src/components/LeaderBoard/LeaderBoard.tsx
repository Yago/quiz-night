/** @jsx jsx */
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { jsx } from '@emotion/core'; // eslint-disable-line
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import { db } from 'services/firebase';

const Question = ({ session }): JSX.Element => {
  const [players] = useCollectionData(
    db
      .doc(`sessions/${session.id}`)
      .collection('players')
      .orderBy('score', 'desc')
  );

  return (
    <div>
      {!isNil(players) && (
        <div>
          <div tw="flex items-end p-5">
            {players?.slice(0, 3)?.map((player, i) => (
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
            <table tw="w-full mt-24">
              {players?.slice(3)?.map((player, i) => (
                <tr key={`player-${player.id}`}>
                  <td>{i + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

Question.propTypes = {
  session: PropTypes.object,
};

Question.defaultProps = {};

export default Question;
