/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'; // eslint-disable-line
import tw from 'twin.macro';

import styles from './Blank.styles';

// interface Props {}

const Blank = (): JSX.Element => <div css={styles}>Sup</div>;

Blank.defaultProps = {};

export default Blank;
