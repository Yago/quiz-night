/* eslint-disable jsx-a11y/control-has-associated-label */
/** @jsx jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

import { button, form } from 'styles';

interface Props {
  name: string;
  onSubmit(data: { name: string }): void;
}

const SignUp = ({ name, onSubmit }: Props): JSX.Element => {
  const [t] = useTranslation();
  const { register, handleSubmit, errors } = useForm();

  return (
    <div tw="container md:w-1/3 mx-auto p-4">
      <h1 tw="text-4xl font-bold">{t('welcome')}</h1>
      <p tw="mt-4">{t('welcome_message')}</p>

      <form onSubmit={handleSubmit(onSubmit)} tw="mt-4">
        <input
          id="name"
          name="name"
          placeholder={t('form.name')}
          defaultValue={name}
          ref={register({ required: true })}
          css={[form.input, errors.name && form.inputError]}
          tw="mt-2"
        />
        {errors.name && (
          <div tw="text-red-600 text-sm mt-2 italic">{t('form.required')}</div>
        )}

        <div tw="mt-6">
          <input
            type="submit"
            css={button.success}
            value={t('form.enter') as string}
          />
        </div>
      </form>
    </div>
  );
};

SignUp.defaultProps = {
  onSubmit: console.log,
};

export default SignUp;
