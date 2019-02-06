/*
 * Header Component for Login Page
 */
import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LogoImage from 'components/ImageFiles/visaya_logo.png';
import Img from 'components/Header/Img';
import Wrapper from 'components/Header/Header';
import Logo from 'components/Header/Logo';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper className="header-login">
        <Logo to="/">
          <Img src={LogoImage} alt="Visaya KPO" />
        </Logo>
      </Wrapper>
    );
  }
}

export default Header;
