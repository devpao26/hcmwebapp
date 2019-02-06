/*
 * Footer Component
 */
import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Exceture from 'components/Svg/ExcetureLogo';
import Img from './Img';
import Wrapper from './Footer';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <p className="app-name">Employee Management Portal</p>
        <p>
          Powered by:
          <Exceture fill="#ffffff" />
        </p>
      </Wrapper>
    );
  }
}

export default Footer;
