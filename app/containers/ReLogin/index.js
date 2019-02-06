/**
 * ReLogin Components
 * @prop {string}   title       Title to be displayed on modal
 * @prop {string}   message     Message in the modal body
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Loading from 'components/LoadingIndicator';
import Modal from 'components/Modal';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';
import Login from 'components/Login';

/* selectors, reducer, saga and actions */
import { makeSelectUsername } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectReloginTitle,
  makeSelectReloginMessage,
  makeSelectReloginToggleModal,
  makeSelectReloginSuccess,
  makeSelectReloginError,
} from './selectors';
import { submitRelogin, toggleReloginModal, resetReloginState } from './actions';

export class ReLoginComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: '',
      passwordError: false,
      isSavingLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggleModal) {
      this.setState({
        password: '',
        passwordError: false,
        isSavingLoading: false,
      });
    }
    if (nextProps.loginError) {
      this.setState({
        isSavingLoading: false,
      });
    }
  }

  componentWillUnmount() {
    // Reset state on unmount
    this.props.resetState();
    this.setState({
      passwordError: false,
      isSavingLoading: false,
    });
  }

  hideReloginModal = (e) => {
    e.preventDefault();
    this.props.hideModal(false, false, false);
  }

  relogin = (e) => {
    e.preventDefault();
    if (this.state.password !== '') {
      this.setState({
        isSavingLoading: true,
      });
      this.props.relogin(this.state.username, this.state.password);
    } else {
      this.setState({
        passwordError: true,
      });
    }
  }

  passwordChange = (e) => {
    this.setState({
      passwordError: false,
      password: e.currentTarget.value,
    });
  }

  render() {
    if (this.props.toggleModal) {
      return (
        <Modal
          show={this.props.toggleModal}
          title={this.props.title}
          width="340px"
        >
          <Login>
            {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
            <h4>{this.props.message}</h4>
            {(this.props.loginError) && <span className="error">* {this.props.loginError.ErrorMsg}</span>}
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="text" value={this.props.username} disabled />
            </p>
            <p>
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange} />
              {(this.state.passwordError) && <span className="error">* Please input your password.</span>}
            </p>
            <ButtonWrapper>
              <Button type="submit" handleRoute={this.relogin} title="Confirm" color="gray">CONFIRM</Button>
              <Button handleRoute={this.hideReloginModal} title="Cancel" color="red">CANCEL</Button>
            </ButtonWrapper>
          </Login>
        </Modal>
      );
    }
    return null;
  }
}

ReLoginComponent.propTypes = {
  toggleModal: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  message: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  username: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // map state props
  loginSuccess: PropTypes.bool,
  loginError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // function dispatch props
  resetState: PropTypes.func,
  hideModal: PropTypes.func,
  relogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  toggleModal: makeSelectReloginToggleModal(),
  title: makeSelectReloginTitle(),
  message: makeSelectReloginMessage(),
  username: makeSelectUsername(),
  loginSuccess: makeSelectReloginSuccess(),
  loginError: makeSelectReloginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(resetReloginState()),
    hideModal: (toggle, title, message) => dispatch(toggleReloginModal(toggle, title, message)),
    relogin: (username, password) => dispatch(submitRelogin(username, password)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'ReLogin', reducer });
const withSaga = injectSaga({ key: 'ReLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReLoginComponent);
