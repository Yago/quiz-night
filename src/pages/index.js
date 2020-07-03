/** @jsx jsx */
import Reactfrom from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Layout from 'components/Layout';
import { db } from 'services/firebase';

const HomePage = () => {
  const [t] = useTranslation();
  const [content] = useDocumentData(db.doc('quiz/quiz1'));

  return (
    <Layout>
      <main tw="w-1/2 mx-auto py-6">
        <h1>
          {content?.title} : {t('greeting')}
        </h1>
      </main>
    </Layout>
  );
};

export default HomePage;
