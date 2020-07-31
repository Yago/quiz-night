/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Head from 'next/head';
import PropTypes from 'prop-types';
import tw from 'twin.macro';

const Layout = ({ children }) => (
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {};

export default Layout;
