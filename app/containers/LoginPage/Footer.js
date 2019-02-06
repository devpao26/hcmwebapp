/*
 * Footer Component for Login Page
 */
import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Exceture from 'components/Svg/ExcetureLogo';
import Img from 'components/Footer/Img';
import Wrapper from 'components/Footer/Footer';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper className="footer-login">
        <p>
          Powered by:
          <Exceture fill="#ffffff" />
        </p>
      </Wrapper>
    );
  }
}

export default Footer;
