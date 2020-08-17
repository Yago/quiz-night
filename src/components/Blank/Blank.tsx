/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

// import PropTypes from 'prop-types';
import styles from './Blank.styles';

const Blank = (): JSX.Element => <div css={styles}>Sup</div>;

Blank.propTypes = {};
Blank.defaultProps = {};

export default Blank;
