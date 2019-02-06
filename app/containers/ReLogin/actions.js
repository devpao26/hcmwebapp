/*
 * ReLogin Actions
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
  RESET_RELOGINSTATE,
  TOGGLE_MODAL,
  SUBMIT_RELOGIN,
  SUBMIT_RELOGIN_SUCCESS,
  SUBMIT_RELOGIN_ERROR,
  SUBMIT_RELOGIN_RESET,
} from './constants';

/**
 * Reset the ReLogin state
 * @return {object}   Returns an object with a type of RESET_RELOGINSTATE
 */
export function resetReloginState() {
  return {
    type: RESET_RELOGINSTATE,
  };
}

/**
 * Toggle ReLogin Modal
 * @param {string}  title     Title for the relogin modal
 * @param {string}  message   Message for the modal body
 * @return {object}           Returns an object with a type of TOGGLE_MODAL
 */
export function toggleReloginModal(toggle, title, message) {
  return {
    type: TOGGLE_MODAL,
    toggle,
    title,
    message,
  };
}

/**
 * Submit ReLogin credentials
 * @param {string}  username    Username of the employee
 * @param {string}  password    Password to be entered by the employee
 * @return {object}             Returns an object with a type of SUBMIT_RELOGIN
 */
export function submitRelogin(username, password) {
  return {
    type: SUBMIT_RELOGIN,
    username,
    password,
  };
}
export function submitReloginSuccess() {
  return {
    type: SUBMIT_RELOGIN_SUCCESS,
  };
}
export function submitReloginError(error) {
  return {
    type: SUBMIT_RELOGIN_ERROR,
    error,
  };
}

/**
 * Reset Success Message
 * @return {object}   Returns an object with a type of SUBMIT_RELOGIN_RESET
 */
export function submitReloginReset() {
  return {
    type: SUBMIT_RELOGIN_RESET,
  };
}
