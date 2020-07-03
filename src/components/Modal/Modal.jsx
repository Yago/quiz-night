/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/** @jsx jsx */
import React, { useRef } from 'react';
import { jsx } from '@emotion/core';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogLabel,
} from '@reach/alert-dialog';
import PropTypes from 'prop-types';
import tw from 'twin.macro';

import { button } from 'styles';

const Modal = ({ open, onClose, small, children, title }) => {
  const modalRef = useRef();
  return (
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
      css={!open && tw`opacity-0 pointer-events-none`}
    >
      <div
        tw="absolute w-full h-full bg-blue-700 opacity-50 z-50"
        onClick={() => onClose()}
      />

      <AlertDialog
        leastDestructiveRef={modalRef}
        isOpen={open}
        tw="
          w-full
          md:mx-4
          md:mx-auto
          py-5
          px-6
          bg-white
          shadow-lg
          transition-transform
          duration-150
          transform
          max-h-screen
          my-auto
          rounded
          z-20
        "
        // eslint-disable-next-line no-sparse-arrays
        css={[
          { zIndex: 999999 },
          !open && tw`scale-95`,
          // eslint-disable-next-line no-nested-ternary
          small ? tw`md:max-w-sm` : tw`md:max-w-6xl`,
          ,
        ]}
      >
        <AlertDialogLabel>{title()}</AlertDialogLabel>

        <AlertDialogContent tw="md:h-auto max-h-screen overflow-y-auto">
          {children}
        </AlertDialogContent>

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
      </AlertDialog>
    </div>
  );
};
Modal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  small: PropTypes.bool,
  title: PropTypes.string,
};

Modal.defaultProps = {
  small: false,
};

export default Modal;
