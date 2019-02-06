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
  GET_EMPLIST_NORESET,
  ENROLL_EMP,
  ENROLL_EMP_SUCCESS,
  ENROLL_EMP_ERROR,
  ENROLL_EMP_RESET,
} from './constants';

/**
 * Clear state on unmount
 * @return {object}   Returns an object with a type of CLEAR_STATE
 */
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

/**
 * Employee List Retrieval
 * @param {number}  page    Page Index of the list retrieval
 * @param {string}  search  Search value for the list
 * @return {object}         An action object with a type of GET_EMPLIST
*/
export function getEmpList(page, search) {
  return {
    type: GET_EMPLIST,
    page,
    search,
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
export function getEmpListNoReset(page, search) {
  return {
    type: GET_EMPLIST_NORESET,
    page,
    search,
  };
}

/**
 * Enroll Employee to WorkForce Monitoring App
 * @return {object}   Returns an object with a type of ENROLL_EMP
 */
export function getEnrollEmpToApp(id) {
  return {
    type: ENROLL_EMP,
    id,
  };
}
export function getEnrollEmpToAppSuccess() {
  return {
    type: ENROLL_EMP_SUCCESS,
  };
}
export function getEnrollEmpToAppError(error) {
  return {
    type: ENROLL_EMP_ERROR,
    error,
  };
}
export function getEnrollEmpToAppReset() {
  return {
    type: ENROLL_EMP_RESET,
  };
}
