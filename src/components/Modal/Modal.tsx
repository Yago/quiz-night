/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import tw from 'twin.macro';

import { button } from 'styles';

const Modal = ({ open, onClose, small, children }) => (
  <div
    tw="
      fixed
      w-full
      h-full
      top-0
      left-0
      flex
      items-start
      md:items-center
      justify-center
      duration-150
      transition-opacity
    "
    css={[!open && tw`opacity-0 pointer-events-none`, { zIndex: 999999 }]}
  >
    <div
      tw="absolute w-full h-full bg-gray-900 opacity-75"
      onClick={() => onClose()}
    />

    <div
      tw="
        w-full
        md:mx-auto
        px-6
        py-5
        bg-white
        shadow-lg
        transition-transform
        duration-150
        transform
        my-auto
        rounded
      "
      // eslint-disable-next-line no-sparse-arrays
      css={[
        !open && tw`scale-95`,
        // eslint-disable-next-line no-nested-ternary
        small ? tw`md:max-w-sm` : tw`md:max-w-4xl`,
        ,
      ]}
    >
      <div tw="md:h-auto overflow-y-auto" css={{ maxHeight: '90vh' }}>
        {children}
      </div>

      <button
        type="button"
        onClick={() => onClose()}
        css={[button.primary, button.rounded]}
        tw="
          absolute
          top-0
          right-0
          z-50
          transform
          md:translate-x-1/2
          md:-translate-y-1/2
        "
      >
        <span tw="sr-only">close</span>
        <span tw="text-lg">&times;</span>
      </button>
    </div>
  </div>
);
Modal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  small: PropTypes.bool,
};

Modal.defaultProps = {
  small: false,
};

export default Modal;
