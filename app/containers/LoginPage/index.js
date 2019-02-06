/*
 * LoginPage 
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faKey, faLock,
} from '@fortawesome/fontawesome-free-solid';

import {
  faEnvelope,
} from '@fortawesome/fontawesome-free-regular';


/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Button from 'components/Button';
import Input from 'components/Input';
import ConfirmBox from 'components/ConfirmationDialog';
import Loading from 'components/LoadingIndicator';

/* Page Specific Components */
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import PageWrap from './PageWrap';

/* Local Container References*/
import {
  makeSelectLoading,
  makeSelectError,
} from '../App/selectors';

import { empLogin, passwordUpdate } from './actions';
import { makeSelectAuthentication, makeSelectUpdatePasswordSuccess } from './selectors';

import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      email: false,
      oldPass: false,
      oldPassError: false,
      newPass: false,
      newPassError: false,
      confirmNewPass: false,
      confirmNewPassError: false,
      showSuccess: true,
      isError: false,
      errorMsg: '',
      updateRequest: false,
    };
  }

  // URL parameter query
  getUrlParamValue = (param) => {
    const query = this.props.location.search.substring(1);
    const vars = query.split("&");
    for (let i=0; i < vars.length; i += 1) {
      let pair = vars[i].split("=");
      if (pair[0] == param) { return pair[1]; }
    }
    return(false);
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  componentDidMount() {
    /**
     * Check the URL params
     * Should watch out for on what we request, if requirements was not met, redirect to /
     * ie: Password Update or Reset Password
     */
    if (this.props.location.search !== '') {
      let isEmail = this.getUrlParamValue('email');
      let passUpdate = this.getUrlParamValue('passwordupdate');
      if (isEmail && this.validateEmail(isEmail) && passUpdate) {
        this.setState({
          email: isEmail,
          updateRequest: passUpdate,
        });
      } else {
        this.reloadPage();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== false) {
      this.setState({
        isError: true,
        errorMsg: nextProps.error.ErrorMsg,
      });
    }
  }

  onChangeUsername = (e) => {
    this.setState({
      isError: false,
      usernameError: false,
      username: e.currentTarget.value,
    });
  }

  onChangePassword = (e) => {
    this.setState({
      isError: false,
      passwordError: false,
      password: e.currentTarget.value,
    });
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    document.getElementById('UsernameInput').blur();
    document.getElementById('PasswordInput').blur();

    const { username, password, } = this.state;

    if (!username && !password) {
      this.setState({
        isError: true,
        errorMsg: 'Please fill up required fields',
        usernameError: true,
        passwordError: true,
      });
    } else if (!username) {
      this.setState({
        isError: true,
        errorMsg: 'Please fill up required fields',
        usernameError: true,
      });
    } else if (!password) {
      this.setState({
        isError: true,
        errorMsg: 'Please fill up required fields',
        passwordError: true,
      });
    } else {
      // Submit Login Credentials to Store state and request in saga
      this.props.onSubmitForm(username, password);
    }
  }

  oldPassword = (e) => {
    this.setState({
      isError: false,
      oldPass: e.target.value,
      oldPassError: false,
    });
  }

  newPassword = (e) => {
    this.setState({
      isError: false,
      newPass: e.target.value,
      newPassError: false,
    });
  }

  confirmPassword = (e) => {
    this.setState({
      isError: false,
      confirmNewPass: e.target.value,
      confirmNewPassError: false,
    });
  }

  onSubmitPassword = (e) => {
    e.preventDefault();
    document.getElementById('ConfirmPassInput').blur();

    const { oldPass, newPass, confirmNewPass, email } = this.state;

    // Validate the reset password fields
    if (!oldPass) {
      this.setState({oldPassError: true})
    }

    if (!newPass) {
      this.setState({newPassError: true})
    }

    if (!confirmNewPass) {
      this.setState({confirmNewPassError: true})
    }

    if (oldPass !== false && newPass && confirmNewPass && newPass === confirmNewPass && newPass !== oldPass) {
      this.setState({
        isError: false,
        errorMsg: '',
        oldPassError: false,
        newPassError: false,
        confirmNewPassError: false,
      });

      // Submit the Reset Password and our New Password in store
      this.props.onSubmitPasswordForm(oldPass, newPass, email);

    } else if (newPass && confirmNewPass && newPass !== confirmNewPass) {
      this.setState({
        isError: true,
        errorMsg: "Your new password and confirm password didn't match. Please try again.",
      });
    } else if (newPass && oldPass && newPass === oldPass) {
      this.setState({
        isError: true,
        errorMsg: "Your reset password and new password should not match. Please try again.",
      });
    }
  }

  reloadPage = () => {
    window.location.replace('/');
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to="/home" />
      );
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <Header />
        <Main>
        </Main>
        <Login>
          { (this.state.updateRequest) ?
            <div>
              {(this.props.loading) && <span className="loading-cont"><Loading /></span>}
              <p>Password Update</p>
              {(this.state.isError) && <span className="error-msg">* {this.state.errorMsg}</span>}
              <form>
                <label htmlFor="label">
                  <FontAwesomeIcon icon={faLock} />
                  <Input id="OldPassInput" type="password" placeholder="Old Password" onChange={this.oldPassword} />
                  {(this.state.oldPassError) && <span className="error-msg">* Please fill out this field</span>}
                </label>
                <label htmlFor="label">
                  <FontAwesomeIcon icon={faLock} />
                  <Input id="NewPassInput" type="password" placeholder="New Password" onChange={this.newPassword} />
                  {(this.state.newPassError) && <span className="error-msg">* Please fill out this field</span>}
                </label>
                <label htmlFor="label">
                  <FontAwesomeIcon icon={faLock} />
                  <Input id="ConfirmPassInput" type="password" placeholder="Confirm New Password" onChange={this.confirmPassword} />
                  {(this.state.confirmNewPassError) && <span className="error-msg">* Please fill out this field</span>}
                </label>
                <p className="buttons">
                  <Button type="submit" handleRoute={this.onSubmitPassword}>Submit</Button>
                </p>
              </form>
            </div> :
            <div>
              {(this.props.loading) && <span className="loading-cont"><Loading /></span>}
              <p>Login</p>
              {(this.state.isError) && <span className="error-msg">* {this.state.errorMsg}</span>}
              <form>
                <label htmlFor="label">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <Input id="UsernameInput" type="text" placeholder="Email Address" onChange={this.onChangeUsername} ref={(el) => { this.usernameInput = el; }} />
                  {(this.state.usernameError) && <span className="error-msg">* Please fill out this field</span>}
                </label>
                <label htmlFor="label">
                  <FontAwesomeIcon icon={faKey} />
                  <Input id="PasswordInput" type="password" placeholder="********" onChange={this.onChangePassword} ref={(el) => { this.passwordInput = el; }} />
                  {(this.state.passwordError) && <span className="error-msg">* Please fill out this field</span>}
                </label>
                <Button handleRoute={this.onSubmitLogin}>Sign In</Button>
              </form>
              <p>
                <label htmlFor="label">
                  {/* <Input type="checkbox" value="0" /> Remember Me */}
                </label>
                <span>
                  <Link to="/">Can&apos;t Login?</Link>
                </span>
              </p>
            </div>
          }
        </Login>
        <Footer />

        <ConfirmBox
          show={this.props.passwordUpdateSuccess}
          title="Success"
          onClick={this.reloadPage}
          okBtnText="OK"
        >
          <p>You have successfully changed your password.<br /> You can now log in using your new password.</p>
        </ConfirmBox>
      </PageWrap>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  userInfo: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  onSubmitPasswordForm: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  passwordUpdateSuccess: PropTypes.bool,
  passwordUpdateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isAuthenticated: makeSelectAuthentication(),
  passwordUpdateSuccess: makeSelectUpdatePasswordSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (username, password) => {
      dispatch(empLogin(username, password));
    },
    onSubmitPasswordForm: (oldpw, newpw, email) => {
      dispatch(passwordUpdate(oldpw, newpw, email));
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);