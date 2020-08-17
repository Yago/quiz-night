/** @jsx jsx */
import Reactfrom from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import { Quiz } from 'types';

import Layout from 'components/Layout';
import { db } from 'services/firebase';

const HomePage = (): JSX.Element => {
  const [t] = useTranslation();
  const [content] = useDocumentData<Quiz>(db.doc('quiz/quiz1'));

  return (
    <Layout>
      <h1>
        {content?.title} : {t('greeting')}
      </h1>
    </Layout>
  );
};

export default HomePage;
