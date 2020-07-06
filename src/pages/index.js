/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
// import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { isEmpty, isNil } from 'ramda';
import tw from 'twin.macro';

import Layout from 'components/Layout';
import { useInterval } from 'hooks';
import { db } from 'services/firebase';
import { timer } from 'utils';

const HomePage = () => {
  // const [t] = useTranslation();
  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [sessions] = useCollectionData(db.collection('sessions'));
  const [currentSession] = useDocumentData(db.doc('sessions/current'));

  const [quiz, setQuiz] = useState({});
  const [session, setSession] = useState({});
  const [time, setTime] = useState({});

  useEffect(() => {
    if (!isNil(currentSession)) {
      const [newQuiz] = quizzes?.filter(i => i.slug === currentSession.quiz);
      setQuiz(newQuiz || {});

      const [newSession] = sessions?.filter(
        i => i.id === currentSession.session
      );
      setSession(newSession || {});
      setTime(timer(newSession, newQuiz));
    }
  }, [currentSession, sessions, quizzes]);

  useInterval(() => {
    if (!isEmpty(session) && !isEmpty(quiz)) setTime(timer(session, quiz));
  }, 1000);

  return (
    <Layout>
      <h1 tw="text-4xl font-bold mb-4">Quiz : {quiz?.title}</h1>

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

      {session?.isStarted === false && (
        <h1 tw="text-4xl font-bold mb-4">Ready !</h1>
      )}
    </Layout>
  );
};

export default HomePage;
