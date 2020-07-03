import { css } from '@emotion/core';
import tw from 'twin.macro';

const input = css`
  ${tw`
    appearance-none
    w-full
    py-3
    px-4
    rounded
    border
    border-gray-400
    hover:border-gray-600
    focus:border-teal-600
    focus:outline-none
    focus:shadow-none
    duration-100
    transition-colors
    placeholder-gray-500
    leading-tight
  `}

  font-size: 16px !important;
`;

export default {
  input,
};
