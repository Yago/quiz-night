import { css } from '@emotion/core';
import tw from 'twin.macro';

const base = css`
  ${tw`
    inline-block
    font-medium
    py-2
    px-4
    border-transparent
    leading-5
    font-medium
    rounded
    text-sm
    text-white
    no-underline
    cursor-pointer
    duration-150
    transition-colors
    ease-in-out
  `}

  &:focus {
    ${tw`outline-none`}
  }
`;

const primary = css`
  ${base}
  ${tw`bg-indigo-500 hover:bg-indigo-600`}

  &:active {
    ${tw`bg-indigo-800`}
  }

  &[disabled] {
    ${tw`bg-indigo-100`}
  }
`;

const danger = css`
  ${base}
  ${tw`bg-red-600 hover:bg-red-500 active:bg-red-700`}

  &[disabled] {
    ${tw`bg-red-100`}
  }
`;

const sm = tw`px-3 py-1`;
const rounded = tw`
  flex
  items-center
  justify-center
  h-10
  w-10
  p-0
  rounded-full
`;

export default { primary, danger, sm, rounded };
