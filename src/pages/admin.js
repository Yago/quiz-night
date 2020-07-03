/** @jsx jsx */
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { isNil } from 'ramda';
import slugify from 'slugify';
import tw from 'twin.macro';

import Layout from 'components/Layout';
import Modal from 'components/Modal';
import QuizForm from 'components/QuizForm';
import QuizList from 'components/QuizList';
import SignIn from 'components/SignIn';
import { auth, db } from 'services/firebase';
import { button } from 'styles';

const HomePage = () => {
  const [t] = useTranslation();
  const [quizzes] = useCollectionData(db.collection('quizzes'));
  const [user] = useAuthState(auth);
  const [modal, openModal] = useState(false);
  const [pending, setPending] = useState(null);

  const createQuiz = (quiz, s) => {
    const slug = s || slugify(quiz.title, { lower: true, strict: true });
    db.collection('quizzes')
      .doc(slug)
      .set({ ...quiz, slug });
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
              <button
                type="button"
                css={button.success}
                onClick={() => openModal(true)}
              >
                <span tw="text-lg">+</span> {t('new_quiz')}
              </button>
            </div>
          </div>

          <QuizList
            quizzes={quizzes}
            onRemove={removeQuiz}
            onEdit={quiz => {
              openModal(true);
              setPending(quiz);
            }}
          />

          <Modal
            open={modal}
            onClose={() => {
              openModal(false);
              setPending(null);
            }}
          >
            <QuizForm
              onSave={(data, slug) => {
                createQuiz(data, slug);
                openModal(false);
                setPending(null);
              }}
              quiz={pending}
            />
          </Modal>
        </div>
      )}

      {isNil(user) && <SignIn />}
    </Layout>
  );
};

export default HomePage;
