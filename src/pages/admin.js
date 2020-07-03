/** @jsx jsx */
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { isNil } from 'ramda';
import slugify from 'slugify';
import tw from 'twin.macro';

import Layout from 'components/Layout';
import NewQuiz from 'components/NewQuiz';
import QuizList from 'components/QuizList';
import SignIn from 'components/SignIn';
import { auth, db } from 'services/firebase';

const HomePage = () => {
  const [t] = useTranslation();
  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [user] = useAuthState(auth);

  const createQuiz = name => {
    const slug = slugify(name, { lower: true, strict: true });
    db.collection('quizzes').doc(slug).set({ title: name, slug });
  };

  const removeQuiz = slug => {
    db.doc(`quizzes/${slug}`).delete();
  };

  return (
    <Layout>
      {!isNil(user) && (
        <div>
          <div tw="my-4 md:my-8">
            <div tw="flex items-center justify-between">
              <h1 tw="text-4xl font-bold mb-4">{t('your_quizes')}</h1>
              <NewQuiz onSubmit={createQuiz} />
            </div>
          </div>
          <QuizList quizzes={quizzes} onRemove={removeQuiz} />
        </div>
      )}

      {isNil(user) && <SignIn />}
    </Layout>
  );
};

export default HomePage;
