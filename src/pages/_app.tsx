import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import 'locales/i18n';

import 'styles/base.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class QuizNightApp extends App {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default QuizNightApp;
