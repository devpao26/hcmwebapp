/**
 * Action
 */
import { SESSION_EXPIRED, SERVER_ERROR, USER_LOGOUT, USER_LOGOUT_RESET, CHANGE_ALERTCOUNT, CHANGE_NOTIFCOUNT } from './constants';

/**
 * Session Expired
 * @return {object} Returns an object with a type of SESSION_EXPIRED
 */
export function sessionIsExpired() {
  return {
    type: SESSION_EXPIRED,
  };
}

/**
 * Server Errors
 * @param {object}  error   Server error details
 * @return {object}         Returns an object with a type of SERVER_ERROR
 */
export function serverError(error) {
  return {
    type: SERVER_ERROR,
    error,
  };
}

/**
 * User Logout
 * @return {object} Returns an object with a type of USER_LOGOUT
 */
export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

/**
 * User Logout Reset
 * @return {object} Returns an object with a type of USER_LOGOUT_RESET
 */
export function userLogoutReset() {
  return {
    type: USER_LOGOUT_RESET,
  };
}

/**
 * Change Alert Count
 */
export function changeAlertCount(count) {
  return {
    type: CHANGE_ALERTCOUNT,
    count,
  };
}

/**
 * Change Notif Count
 */
export function changeNotifCount(count) {
  return {
    type: CHANGE_NOTIFCOUNT,
    count,
  };
}

export function accessDenied(bool) {
  return {
    type: NO_PERMISSION,
    bool,
  };
}
