/**
 * Dialog Box
 * All needed is function to open and close this dialog box
 *
 * Props: show, title, onClose, showCloseBtn, view
 * Usage: <Dialog show= title="" onClose={function} showCloseBtn view="" width=/>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { media } from 'components/StyleUtils';

/* Global Component */
import Container from 'components/StyleUtils/Overlay';
import Close from 'components/StyleUtils/Close';

const H2 = styled.h2`
  font-size: 1.1em;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 0;
  padding: 12px 15px;
  background-color: ${(props) => props.bgColor ? props.bgColor : '#242a2a'};
  color: #fff;
  text-align: center;
`;

const scaleModal = keyframes`
  from, 0%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform-origin: 0 0;
  }

  0% {
    opacity: 0;
    transform: scale(.5) translate(-50%, -50%);
  }

  to {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: -1.4px -1.4px 23.5px 0.5px rgba(45, 44, 44, 0.52);
  width: ${(props) => props.width ? props.width : '350px'};
  text-align: left;
  z-index: 2;
  animation: ${scaleModal} .2s ease-in;

  ${media.tablet `
    width: 90%;
    left: 50%;
  `}
`;

const WrapChildren = styled.div`
  clear: both;
  padding: 15px 15px;
  font-size: 12px;
  position: relative;

  .create {
    .label {
      font-size: .8em;
      display: block;
      margin: 0 0 0;
    }

    p {
      margin: 0 0 20px;
    }

    small {
      display: block;
      font-size: .8em;
      color: #ff5252;
      font-style: italic;
    }
  }

  .center {
    text-align: center;

    label {
      font-size: .8em;
    }

    p {
      margin: 0 0 20px;
      font-size: 1.1em;
    }

    .btn {
      margin-bottom: 5px;
      display: block;
    }
  }

  .search-filter {
    padding: 0;

    form {
      width: 100%;
      margin-right: 0;
    }
  }

  .action_button {
    padding: 15px 0 5px;
    text-align: center;

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 39%;
      margin: 0 5px;
    }
  }

  ${media.tablet`
    padding: 10px;
  `}
`;

class DialogBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!this.props.show) {
      return null;
    }

    // Render Close Button if declared in props
    let close = '';
    if (this.props.showCloseBtn) {
      close = (
        <Close onClick={this.props.onClose}><i className="fa fa-close"></i></Close>
      );
    }

    // Change Title Background Color depends on View
    let bgColor = '';
    if (this.props.view === 'dept') {
      bgColor = '#5188be';
    } else if (this.props.view === 'team') {
      bgColor = '#019382';
    } else if (this.props.view === 'subteam') {
      bgColor = '#826092';
    } else if (this.props.view === 'subcategoryteam') {
      bgColor = '#cd6b3e';
    }

    return (
      <Container overlay={this.props.noOverlay}>
        <Content width={this.props.width} >
          {close}
          {this.props.title ? <H2 bgColor={bgColor}>{this.props.title}</H2> : ''}
          <WrapChildren>
            {Children.toArray(this.props.children)}
          </WrapChildren>
        </Content>
      </Container>
    );
  }
}

DialogBox.defaultProps = {
  noOverlay: false,
};

DialogBox.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.string,
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  showCloseBtn: PropTypes.bool,
  noOverlay: PropTypes.bool,
};

export default DialogBox;
