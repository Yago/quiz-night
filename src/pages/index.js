/** @jsx jsx */
import Reactfrom from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Layout from 'components/Layout';

const HomePage = () => {
  const [t] = useTranslation();

  return (
    <Layout>
      <main tw="w-1/2 mx-auto py-6">
        <h1>Title : {t('greeting')}</h1>
      </main>
    </Layout>
  );
};

export default HomePage;
