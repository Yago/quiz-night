/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
// import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { nanoid } from 'nanoid';
import { useCookie } from 'next-cookie';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'ramda';
import tw from 'twin.macro';

import Layout from 'components/Layout';
import ReadyScreen from 'components/ReadyScreen';
import SignUp from 'components/SignUp';
import { useInterval } from 'hooks';
import { db } from 'services/firebase';
import { timer } from 'utils';

const HomePage = ({ cookies }) => {
  // const [t] = useTranslation();
  const cookie = useCookie(cookies);
  const [quiz, setQuiz] = useState({});
  const [session, setSession] = useState({});
  const [time, setTime] = useState({});

  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [sessions] = useCollectionData(db.collection('sessions'));
  const [currentSession] = useDocumentData(db.doc('sessions/current'));

  const isPlayerReady =
    !isEmpty(session) &&
    !isNil(cookie.get('qn_playerid')) &&
    !isNil(session?.players?.find(i => i.id === cookie.get('qn_playerid')));

  const registerPlayer = name => {
    const id = nanoid();
    cookie.set('qn_playername', name);
    cookie.set('qn_playerid', id);
    db.doc(`sessions/${session.id}`).update({
      players: [...session.players, { name, id, points: 0 }],
    });
  };

  useEffect(() => {
    if (!isNil(currentSession)) {
      const [newQuiz] = quizzes?.filter(i => i.slug === currentSession.quiz);
      setQuiz(newQuiz || {});

      const [newSession] = sessions?.filter(
        i => i.id === currentSession.session
      );
      setSession(newSession || {});
    }
  }, [currentSession, sessions, quizzes]);

  useInterval(() => {
    if (!isEmpty(session) && !isEmpty(quiz)) setTime(timer(session, quiz));
  }, 1000);

  return (
    <Layout>
      {!isNil(time?.isCompleted) && !time?.isCompleted && session?.isPlaying && (
        <div>
          {!isNil(time?.isQuestion) && time?.isQuestion && (
            <h1 tw="text-4xl font-bold mb-4">
              Question #{time?.currentQuestion}
            </h1>
          )}

          {!isNil(time?.isQuestion) && !time?.isQuestion && (
            <h1 tw="text-4xl font-bold mb-4">Results #{time?.currentBreak}</h1>
          )}

          {!isNil(time?.timer) && (
            <h1 tw="text-4xl font-bold mb-4">{time?.timer}</h1>
          )}
          {!isNil(time?.timer2) && (
            <h1 tw="text-4xl font-bold mb-4">{time?.timer2}</h1>
          )}
        </div>
      )}

      {session?.isStarted && session?.isPlaying === false && (
        <h1 tw="text-4xl font-bold mb-4">Paused</h1>
      )}

      {isPlayerReady && <ReadyScreen quiz={quiz} session={session} />}

      {!isPlayerReady && !isEmpty(session) && (
        <SignUp
          onSubmit={({ name }) => registerPlayer(name)}
          name={cookie.get('qn_playername')}
        />
      )}

      {isEmpty(session) && <p>Pas de quiz pour le moment</p>}
    </Layout>
  );
};

HomePage.getInitialProps = async ctxt => ({
  cookies: ctxt.req.headers.cookie || '',
});

HomePage.propTypes = {
  cookies: PropTypes.string,
};

HomePage.defaultProps = {};

export default HomePage;
