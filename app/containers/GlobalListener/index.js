/**
 * Global Listener
 * This component will mount only to listen to global sagas
 * sagas that are need to be mounted while request is still in process
 * we can also declare here the references we need for the whole app
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/* Global injectSaga and injectReducer */
// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';

import Loading from 'components/LoadingIndicator';
import Confirm from 'components/ConfirmationDialog';
import Alerts from 'containers/Alerts';
import ReLogin from 'containers/ReLogin';

import Toaster from 'components/Toaster';
import { showToaster } from 'components/Toaster/actions';

/* selectors, reducer, saga and actions */
import {
  makeSelectIsUserLoggingOut,
  makeSelectSessionExpired,
  makeSelectAuthenticated,
  makeSelectUserInfo,
  makeSelectAlertCount,
  makeSelectNotifCount,
  makeSelectServerError,
} from '../App/selectors';

import { userLogoutReset, changeAlertCount, changeNotifCount, serverError } from '../App/actions';

class GlobalListener extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmLogout: false,
      toastMessage: false,
      isLoggingOut: false,
      isServerError: false,
      isServerErrorMsg: '',
      showRetryButton: false,
    };
  }

  componentDidMount() {
    // Initialize OneSignal
    const that = this;
    window.OneSignal.push(() => {
      /**
       * Occurs when the user's subscription changes to a new value.
       * NOTE: Should enable this in case we want to record the number of pc/browser who
       *       subscribe to alerts and notifications
       */
      // window.OneSignal.on('subscriptionChange', (isSubscribed) => {
      //   console.log('The user subscription state now:', isSubscribed); // eslint-disable-line no-console
      // });

      /**
       * Gives the OneSignal User ID of the Subscriber
       * NOTE: Should catch this if we want to record the user ids
       */
      // window.OneSignal.getUserId().then((userId) => {
      //   // console.log('OneSignal User ID:', userId); // eslint-disable-line no-console
      //   // (Output) OneSignal User ID
      // });

      window.OneSignal.on('notificationDisplay', (event) => {
        // console.log('OneSignal notification displayed:', event); // eslint-disable-line no-console
        that.catchNotifications(event.data);
      });

      // window.OneSignal.showHttpPrompt(); // no need to show http prompt as this is set in our one signal settings
      window.OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          // console.log('Push notifications are enabled!');
          // do something if push notification is enabled
        } else {
          // console.log('Push notifications are not enabled yet.');
          window.OneSignal.showHttpPrompt(); // let's show the prompt again (hope this works)
        }
      });
    });

    /**
     * Check if our notification permission is set.
     * NOTE: We should do something if permission is denied or granted
     */
    // window.OneSignal.push(['getNotificationPermission', (permission) => {
    //   console.log('Site Notification Permission:', permission); // eslint-disable-line no-console
    //   // (Output) Site Notification Permission: default
    // }]);

    // window.OneSignal.push(['addListenerForNotificationOpened', (data) => {
    //   console.log('Received NotificationOpened:', data); // eslint-disable-line no-console
    //   // console.log(data); // eslint-disable-line no-console
    // }]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && nextProps.userData) {
      window.OneSignal.setSubscription(true);
      window.OneSignal.sendTag('email', nextProps.userData.Email);
    }

    if (nextProps.serverError !== false) {
      this.setState({
        isServerError: true,
        isServerErrorMsg: 'There was a problem communicating the server. Do you want to test your connection?',
      });
    }
  }

  catchNotifications = (data) => {
    const message = {
      name: data.Name,
      isAlert: data.IsAlert,
    };

    this.props.showToaster(message);

    if (data.IsAlert) {
      const count = this.props.alertCount + 1;
      this.props.changeAlertCount(count);
    } else {
      const count = this.props.notifCount + 1;
      this.props.changeNotifCount(count);
    }
  }

  // Logout User and Redirect to home
  logoutUserAndGotoHome = () => {
    this.setState({
      isLoggingOut: true,
    });
    window.location.pathname = '/';
    // Delete the OneSignal notification email tag first, if success we should redirect to home
    // window.OneSignal.setSubscription(false);
    // window.OneSignal.deleteTags(['email']).then((tagsDeleted) => {
    //   if (tagsDeleted[0] === 'email') {
    //     window.location.pathname = '/';
    //   }
    // });
  }

  testConnection = () => {
    if (navigator.onLine) {
      this.props.hideServerError();
    } else {
      this.setState({
        isServerErrorMsg: 'It seems you don&apos;t have internet connection. Please contact your IT administrator to check your connectivity.',
      });
    }
  }

  render() {
    return (
      <div>
        {(this.props.isAuthenticated) && <Alerts />}
        {(this.props.isAuthenticated) && <ReLogin />}
        <Toaster />
        <Confirm
          show={this.props.sessionExpired}
          title="SESSION EXPIRED"
          onClick={this.logoutUserAndGotoHome}
          okBtnText="OK"
        >
          {(this.state.isLoggingOut) && <div className="loading-cont"><Loading /></div>}
          <p>Your session has expired.<br />You will be redirected to Login page.</p>
        </Confirm>
        <Confirm
          show={this.state.serverError}
          title="SERVER ERROR"
          onClick={this.testConnection}
          okBtnText="OK"
        >
          <p>{this.state.isServerErrorMsg}</p>
        </Confirm>
        <Confirm
          show={this.props.userLoggingOut}
          title="LOG OUT"
          onClick={this.logoutUserAndGotoHome}
          onClose={this.props.cancelUserLogout}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isLoggingOut) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to Log out?</p>
        </Confirm>
      </div>
    );
  }
}

GlobalListener.defaultProps = {
  userLoggingOut: false,
  sessionExpired: false,
};

GlobalListener.propTypes = {
  userData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  isAuthenticated: PropTypes.bool,
  userLoggingOut: PropTypes.bool,
  sessionExpired: PropTypes.bool,
  serverError: PropTypes.any,
  alertCount: PropTypes.number,
  notifCount: PropTypes.number,
  // Function dispatch props
  showToaster: PropTypes.func,
  cancelUserLogout: PropTypes.func,
  changeAlertCount: PropTypes.func,
  changeNotifCount: PropTypes.func,
  hideServerError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserInfo(),
  isAuthenticated: makeSelectAuthenticated(),
  sessionExpired: makeSelectSessionExpired(),
  serverError: makeSelectServerError(),
  userLoggingOut: makeSelectIsUserLoggingOut(),
  alertCount: makeSelectAlertCount(),
  notifCount: makeSelectNotifCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    showToaster: (data) => dispatch(showToaster(data)),
    cancelUserLogout: () => dispatch(userLogoutReset()),
    changeAlertCount: (count) => dispatch(changeAlertCount(count)),
    changeNotifCount: (count) => dispatch(changeNotifCount(count)),
    hideServerError: () => dispatch(serverError(false)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'global', reducer });
// const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(GlobalListener);
