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
  CLEAR_STATE,
  GET_EMPLIST,
  GET_EMPLIST_SUCCESS,
  GET_EMPLIST_ERROR,
  GET_EMPLIST_SEARCH,
  CHANGE_STATUS,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  CHANGE_STATUS_RESET,
  SEND_NEWPASS,
  SEND_NEWPASS_SUCCESS,
  SEND_NEWPASS_ERROR,
  SEND_NEWPASS_RESET,
  GET_REFS,
  GET_REFS_SUCCESS,
  GET_REFS_ERROR,
  UPDATE_EMPEMAIL,
  UPDATE_EMPEMAIL_SUCCESS,
  UPDATE_EMPEMAIL_ERROR,
  UPDATE_EMPEMAIL_RESET,
} from './constants';

/**
 * Clear state on unmount
 * @return {object}   Returns an object with a type of CLEAR_STATE
 */
export function getClearState() {
  return {
    type: CLEAR_STATE,
  };
}

// #region employee list
/**
 * Employee Login, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_EMPLIST
*/
export function getEmpList(page, search, filter) {
  return {
    type: GET_EMPLIST,
    page,
    search,
    filter,
  };
}
export function getEmpListSuccess(data, pages) {
  return {
    type: GET_EMPLIST_SUCCESS,
    data,
    pages,
  };
}
export function getEmpListError(error) {
  return {
    type: GET_EMPLIST_ERROR,
    error,
  };
}
export function getEmpListSearchFilter(page, search, filter) {
  return {
    type: GET_EMPLIST_SEARCH,
    page,
    search,
    filter,
  };
}
// #endregion

// #region get references
/**
 * Get references
 */
export function getRefs() {
  return {
    type: GET_REFS,
  };
}
export function getRefsSuccess(data) {
  return {
    type: GET_REFS_SUCCESS,
    data,
  };
}
export function getRefsError(error) {
  return {
    type: GET_REFS_ERROR,
    error,
  };
}
// #endregion

// #region Create/Change employee status
/**
 * Create / Change Employee Status
 * @return {object}   Returns an object with a type of CHANGE_STATUS
 */
export function getChangeStatus(empID, email, status) {
  return {
    type: CHANGE_STATUS,
    empID,
    email,
    status,
  };
}
export function getChangeStatusSuccess() {
  return {
    type: CHANGE_STATUS_SUCCESS,
  };
}
export function getChangeStatusError(error) {
  return {
    type: CHANGE_STATUS_ERROR,
    error,
  };
}
export function getChangeStatusReset() {
  return {
    type: CHANGE_STATUS_RESET,
  };
}
// #endregion

// #region Send new password
/**
 * Send new password
 * @return {object}   Returns an object with a type of SEND_NEWPASS
 */
export function getSendNewPass(empID) {
  return {
    type: SEND_NEWPASS,
    empID,
  };
}
export function getSendNewPassSuccess() {
  return {
    type: SEND_NEWPASS_SUCCESS,
  };
}
export function getSendNewPassError(error) {
  return {
    type: SEND_NEWPASS_ERROR,
    error,
  };
}
export function getSendNewPassReset() {
  return {
    type: SEND_NEWPASS_RESET,
  };
}
// #endregion

// #region update email of employee
/**
 * Updating of Employees email
 */
export function getUpdateEmail(empID, newEmail) {
  return {
    type: UPDATE_EMPEMAIL,
    empID,
    newEmail,
  };
}
export function getUpdateEmailSuccess() {
  return {
    type: UPDATE_EMPEMAIL_SUCCESS,
  };
}
export function getUpdateEmailError(error) {
  return {
    type: UPDATE_EMPEMAIL_ERROR,
    error,
  };
}
export function getUpdateEmailReset() {
  return {
    type: UPDATE_EMPEMAIL_RESET,
  };
}
// #endregion
