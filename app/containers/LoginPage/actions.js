/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  EMP_LOGIN,
  API_SUCCESS,
  API_FAILED,
} from '../App/constants';

import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORDSUCCESS,
  UPDATE_PASSWORDERROR,
} from './constants';

/**
 * Employee Login, this action starts the request saga
 *
 * @param {string} username Username for login
 * @param {string} password Password for login
 *
 * @return {object}         An action object with a type of EMP_LOGIN
 */
export function empLogin(username, password) {
  return {
    type: EMP_LOGIN,
    username,
    password,
  };
}

/**
 * Dispatched when emp login succeed by the request saga
 * @param  {array} uinfo The Employee data
 *
 * @return {object}      An action object with a type of API_SUCCESS passing the repos
 */
export function loginSuccess(uinfo, token, alert, notif) {
  return {
    type: API_SUCCESS,
    uinfo,
    token,
    alert,
    notif,
  };
}

/**
 * Dispatched when login fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of API_FAILED passing the error
 */
export function loginError(error) {
  return {
    type: API_FAILED,
    error,
  };
}

/**
 * Dispatched when resetting password
 *
 * @param {string} oldpw
 * @param {string} newpw
 * @param {string} email
 */
export function passwordUpdate(oldpw, newpw, email) {
  return {
    type: UPDATE_PASSWORD,
    oldpw,
    newpw,
    email,
  };
}

/**
 * Dispatched when Reset Password is a success
 * No data to return, reducer will handle the true/false data in state
 */
export function passwordUpdateSuccess() {
  return {
    type: UPDATE_PASSWORDSUCCESS,
  };
}

/**
 * Dispatch when Reset password has an error
 * @param {error}     error
 *
 * @returns {object}  that will notify the UI what type of error we encountered
 */
export function passwordUpdateError(error) {
  return {
    type: UPDATE_PASSWORDERROR,
    error,
  };
}
