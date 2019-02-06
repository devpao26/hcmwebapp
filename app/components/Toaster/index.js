/**
 * Toaster Component
 * @prop {bool}   show    Shows the toaster
 * @prop {bool}   close    Hide the toaster
 * @prop {string} message Message for the toaster
 * @prop {string} type    Select which type of toaster are we going to show (success, warning, error)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes, faBell } from '@fortawesome/fontawesome-free-solid';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { makeSelectToaster, makeSelectToastData } from './selectors';
import { hideToaster } from './actions';

import Wrapper from './Wrapper';

class ToasterComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.showToaster();
    }
  }

  showToaster = () => {
    const el = document.getElementById('toaster');
    el.classList.add('show');
    setTimeout(() => {
      el.classList.remove('show');
      this.props.close();
    }, 8000);
  }

  closeToaster = () => {
    const el = document.getElementById('toaster');
    el.classList.remove('show');
    this.props.close();
  }

  // TODO: make our toaster component close when receiving a new notification then
  //       show it again and display the new content
  //       or make this component create multiple toaster messages
  // toggleClassInToaster = () => {
  //   const promise = new Promise((resolve, reject) => {
  //     const el = document.getElementById('toaster');
  //     if (el.classList.contains('show')) {
  //       resolve('success');
  //     } else {
  //       reject('error');
  //     }
  //   });

  //   return promise;
  // }

  render() {
    const { data } = this.props;
    const message = (data) || { name: '', isAlert: '' };
    return (
      <Wrapper id="toaster">
        <button className="close" title="Close" onClick={this.closeToaster}><FontAwesomeIcon icon={faTimes} /></button>
        <p>
          <FontAwesomeIcon icon={(message.isAlert) ? faExclamationCircle : faBell} />
          <span>{message.name}</span>
        </p>
      </Wrapper>
    );
  }
}

ToasterComponent.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // function dispatch props
  close: PropTypes.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  show: makeSelectToaster(),
  data: makeSelectToastData(),
});

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(hideToaster()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'toaster', reducer });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(ToasterComponent);
