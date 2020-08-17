/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import tw from 'twin.macro';

const PageTransition = ({ condition, children }): JSX.Element => (
  <AnimatePresence>
    {condition && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ diration: 0.2 }}
        tw="fixed top-0 left-0 bottom-0 right-0 overflow-y-auto"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

PageTransition.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
PageTransition.defaultProps = {};

export default PageTransition;
