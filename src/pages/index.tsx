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
import { isEmpty, isNil } from 'ramda';
import tw from 'twin.macro';
import { CurrentSession, Quiz, Session, Timer } from 'types';

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

interface Props {
  cookies: string;
}

const HomePage = ({ cookies }: Props): JSX.Element => {
  // const [t] = useTranslation();
  const cookie = useCookie(cookies);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [time, setTime] = useState<Timer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean | null>(null);

  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [sessions] = useCollectionData(db.collection('sessions'));
  const [currentSession] = useDocumentData<CurrentSession>(
    db.doc('sessions/current')
  );

  const updateReadyness = () => {
    if (!isEmpty(session) && !isNil(cookie.get('qn_playerid'))) {
      db.doc(`sessions/${session?.id}`)
        .collection('players')
        .doc(cookie.get('qn_playerid'))
        .get()
        .then(doc => setIsPlayerReady(doc.exists));
    }
  };

  const registerPlayer = (name: string) => {
    const id = nanoid();
    cookie.set('qn_playername', name);
    cookie.set('qn_playerid', id);
    db.doc(`sessions/${session?.id}`)
      .collection('players')
      .doc(id)
      .set({ name, id, score: 0 })
      .then(() => {
        updateReadyness();
      });
  };

  const setScore = (score: number) => {
    const id = cookie.get('qn_playerid');
    db.doc(`sessions/${session?.id}`)
      .collection('players')
      .doc(cookie.get('qn_playerid'))
      .get()
      .then(doc => {
        const previousScore = doc.data()?.score;
        db.doc(`sessions/${session?.id}`)
          .collection('players')
          .doc(id as string)
          .update({ score: previousScore + score });
      });
  };

  useEffect(() => updateReadyness(), [session]);

  useEffect(() => {
    if (!isNil(currentSession)) {
      const [newQuiz] = (quizzes as Quiz[])?.filter(
        i => i.slug === currentSession.quiz
      );
      setQuiz(newQuiz || {});

      const [newSession] = (sessions as Session[])?.filter(
        i => i.id === currentSession.session
      );
      setSession(newSession || {});
    }
  }, [currentSession, sessions, quizzes]);

  useInterval(() => {
    if (!isEmpty(session) && !isEmpty(quiz) && session?.isPlaying)
      setTime(timer(session, quiz as Quiz));
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
          isPlayerReady && session?.isStarted && time?.isCompleted === false
        }
      >
        <Game time={time} quiz={quiz} session={session} onScore={setScore} />
      </PageTransition>

      <PageTransition
        condition={isPlayerReady && session?.isStarted && time?.isCompleted}
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

HomePage.defaultProps = {};

export default HomePage;
