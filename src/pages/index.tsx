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

import EmptyScreen from 'components/EmptyScreen';
import Game from 'components/Game';
import Layout from 'components/Layout';
import LeaderBoard from 'components/LeaderBoard';
import PageTransition from 'components/PageTransition';
import ReadyScreen from 'components/ReadyScreen';
import SignUp from 'components/SignUp';
import { useInterval } from 'hooks';
import { db } from 'services/firebase';
import { timer } from 'utils';

const HomePage = ({ cookies }): JSX.Element => {
  // const [t] = useTranslation();
  const cookie = useCookie(cookies);
  const [quiz, setQuiz] = useState({});
  const [session, setSession] = useState({});
  const [time, setTime] = useState({});
  const [isPlayerReady, setIsPlayerReady] = useState(null);

  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [sessions] = useCollectionData(db.collection('sessions'));
  const [currentSession] = useDocumentData(db.doc('sessions/current'));

  const updateReadyness = () => {
    if (!isEmpty(session) && !isNil(cookie.get('qn_playerid'))) {
      db.doc(`sessions/${session.id}`)
        .collection('players')
        .doc(cookie.get('qn_playerid'))
        .get()
        .then(doc => setIsPlayerReady(doc.exists));
    }
  };

  const registerPlayer = name => {
    const id = nanoid();
    cookie.set('qn_playername', name);
    cookie.set('qn_playerid', id);
    db.doc(`sessions/${session.id}`)
      .collection('players')
      .doc(id)
      .set({ name, id, score: 0 })
      .then(() => {
        updateReadyness();
      });
  };

  const setScore = score => {
    const id = cookie.get('qn_playerid');
    db.doc(`sessions/${session.id}`)
      .collection('players')
      .doc(cookie.get('qn_playerid'))
      .get()
      .then(doc => {
        const previousScore = doc.data()?.score;
        db.doc(`sessions/${session.id}`)
          .collection('players')
          .doc(id)
          .update({ score: previousScore + score });
      });
  };

  useEffect(() => updateReadyness(), [session]);

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
    if (!isEmpty(session) && !isEmpty(quiz) && session.isPlaying)
      setTime(timer(session, quiz));
  }, 1);

  return (
    <Layout>
      <PageTransition
        condition={
          (isNil(isPlayerReady) || isPlayerReady === false) && !isEmpty(session)
        }
      >
        <SignUp
          onSubmit={({ name }) => registerPlayer(name)}
          name={cookie.get('qn_playername')}
        />
      </PageTransition>

      <PageTransition condition={isPlayerReady && session?.isStarted === false}>
        <ReadyScreen quiz={quiz} session={session} />
      </PageTransition>

      <PageTransition
        condition={
          isPlayerReady && session?.isStarted && time.isCompleted === false
        }
      >
        <Game time={time} quiz={quiz} session={session} onScore={setScore} />
      </PageTransition>

      <PageTransition
        condition={isPlayerReady && session?.isStarted && time.isCompleted}
      >
        <LeaderBoard session={session} />
      </PageTransition>

      <PageTransition condition={isEmpty(session)}>
        <EmptyScreen />
      </PageTransition>
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
