/*
 * Header Component
 */
import React, { Children } from 'react';
import { PropTypes } from 'prop-types';

import LogoImage from 'components/ImageFiles/visaya_logo.png';

import Img from './Img';
import Wrapper from './Header';
import Menu from './Menu';
import Logo from './Logo';
import SidebarTrigger from './SidebarTrigger';

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showSidebar = (e) => {
    e.preventDefault();
    const mainWrapper = document.getElementById('mainWrapper');
    // Toggle show class in our main wrapper
    mainWrapper.classList.toggle('show');
  }

  render() {
    return (
      <Wrapper>
        <SidebarTrigger onClick={this.showSidebar}><span className="fa fa-bars" /></SidebarTrigger>
        <Logo to="/">
          <Img src={LogoImage} alt="Visaya KPO" />
        </Logo>
        <Menu>
          <li>
            <span className="dead-li">Newsletter</span>
          </li>
        </Menu>
      </Wrapper>
      
    );
  }
}

Header.propTypes = {
  show: PropTypes.func,
  close: PropTypes.func,
};

export default Header;
