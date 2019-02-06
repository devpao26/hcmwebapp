/**
 * Modal Box
 * All needed is function to open and close this dialog box
 *
 * Props: show, title, onClose, showCloseBtn, width
 * Usage: <Modal show= title="" onClose={function} showCloseBtn width="500px" />
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

/* Global Component */
import Container from 'components/StyleUtils/Overlay';
import Close from 'components/StyleUtils/Close';

import H2 from './H2';
import Content from './Content';
import WrapChildren from './Children';

const textCenter = {
  textAlign: 'center',
};

class ModalBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // componentWillReceiveProps(nextProps) {
  //   const el = document.getElementsByTagName('body')[0];
  //   if (nextProps.show) {
  //     el.classList.add('no-scroll');
  //   }
  // }

  // onModalClose = (e) => {
  //   const el = document.getElementsByTagName('body')[0];
  //   el.classList.remove('no-scroll');
  //   this.props.onClose(e);
  // }
  render() {
    if (!this.props.show) {
      return null;
    }

    // Render Close Button if declared in props
    let close = '';
    if (this.props.showCloseBtn && this.props.title) {
      close = (
        <Close onClick={this.props.onClose}><FontAwesomeIcon icon={faTimes} /></Close>
      );
    } else if (this.props.showCloseBtn && !this.props.title) {
      close = (
        <Close red onClick={this.props.onClose}><FontAwesomeIcon icon={faTimes} /></Close>
      );
    }

    return (
      <Container overlay={this.props.noOverlay}>
        <Content className="md-content" width={this.props.width}>
          {close}
          {this.props.title ? <H2 style={textCenter}>{this.props.title}</H2> : ''}
          <WrapChildren>
            {Children.toArray(this.props.children)}
          </WrapChildren>
        </Content>
      </Container>
    );
  }
}

ModalBox.defaultProps = {
  noOverlay: false,
};

ModalBox.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  noOverlay: PropTypes.bool,
};

export default ModalBox;
