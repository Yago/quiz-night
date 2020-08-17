/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Head from 'next/head';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => (
  <React.Fragment>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="manifest" href="/manifest.json" />
      {/* Import CSS for nprogress */}
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>

    <main>{children}</main>
  </React.Fragment>
);

Layout.defaultProps = {};

export default Layout;
