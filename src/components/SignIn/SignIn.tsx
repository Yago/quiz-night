/** @jsx jsx */
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { auth } from 'services/firebase';
import { button, form } from 'styles';

const SignIn = (): JSX.Element => {
  const [t] = useTranslation();
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div tw="h-screen flex items-center justify-center">
      <form
        tw="w-1/2 sm:w-1/3 md:w-1/4"
        onSubmit={e => {
          e.preventDefault();
          auth.signInWithEmailAndPassword(
            email.current.value,
            password.current.value
          );
        }}
      >
        {/* eslint-disable */}
        <input ref={email} css={form.input} tw="mb-3" type="text" placeholder="Email" />
        <input ref={password} css={form.input} tw="mb-3" type="password" placeholder="Password" />
        <button css={button.primary} type="submit">{t('login')}</button>
        {/* eslint-enable */}
      </form>
    </div>
  );
};

export default SignIn;
