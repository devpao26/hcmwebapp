/**
 * Confirmation Dialog Box
 * All needed is function to open and close this dialog box
 *
 * Props: show, title, message (optional), route (optional), okBtnText (required), cancelBtn (boolean), cancelBtnText (if you use cancelBtn), onClick, onClose, showCloseBtn
 * Usage: <Confirm show= title="" message="" route="" okBtnText="" cancelBtn cancelBtnText="" onClick={function} onClose={function} showCloseBtn />
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

/* Global Component */
import Container from 'components/StyleUtils/Overlay';
import Close from 'components/StyleUtils/Close';
import A from 'components/StyleUtils/ModalA';
import ButtonBox from 'components/StyleUtils/ModalButtonBox';
import Button from 'components/StyleUtils/ModalButton';

import H2 from './H2';
import Content from './Content';
import Message from './Message';

class ConfirmationDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
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

    if (!this.props.show) {
      return null;
    }

    // Render Cancel Button
    let buttonCancel = null;
    if (this.props.cancelBtn) {
      buttonCancel = (
        <Button color="gray" onClick={this.props.onClose}>
          {this.props.cancelBtnText}
        </Button>
      );
    }

    // Render a button tag
    let button = null;
    if (this.props.route) {
      button = (
        <A to={this.props.route}>
          {this.props.okBtnText}
        </A>
      );
    } else if (this.props.onClick) {
      button = (
        <Button onClick={this.props.onClick}>
          {this.props.okBtnText}
        </Button>
      );
    } else {
      button = (
        <Button>
          {this.props.okBtnText}
        </Button>
      );
    }

    // Render Message
    let message = null;
    if (this.props.message) {
      message = (
        <Message>
          <p>
            {this.props.message}
          </p>
        </Message>
      );
    } else {
      message = (
        <Message>
          {Children.toArray(this.props.children)}
        </Message>
      );
    }

    // Render Close Button if declared in props
    let close = null;
    if (this.props.showCloseBtn) {
      close = (
        <Close onClick={this.props.onClose}><FontAwesomeIcon icon={faTimes} /></Close>
      );
    }

    return (
      <Container overlay={this.props.noOverlay}>
        <Content>
          {close}
          {this.props.title.toUpperCase() ? <H2 bgColor={bgColor}>{this.props.title}</H2> : ''}
          {message}
          <ButtonBox>
            {button}
            {buttonCancel}
          </ButtonBox>
        </Content>
      </Container>
    );
  }
}

ConfirmationDialog.defaultProps = {
  noOverlay: false,
};

ConfirmationDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  route: PropTypes.string,
  okBtnText: PropTypes.string.isRequired,
  cancelBtnText: PropTypes.string,
  cancelBtn: PropTypes.bool,
  showCloseBtn: PropTypes.bool,
  view: PropTypes.string,
  noOverlay: PropTypes.bool,
};

export default ConfirmationDialog;
