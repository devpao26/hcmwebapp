/*
 * HomePage Actions
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
/* eslint no-unused-vars: "off" */
import {
  GET_DATA,
  DATA_REFS,
  DATA_REFSSUCCESS,
  DATA_REFSERROR,
  EMP_SHIFTSUMMARYSUCCESS,
  EMP_SHIFTSUMMARYERROR,
  EMP_LEAVEHISTORYSUCCESS,
  EMP_LEAVEHISTORYERROR,
} from './constants';

/**
 * Dispatch to retrieve the employee initial data
 * @param {string} date A string to reference the date for shift summary retrieval
 * @return {object}     An object with a type of GET_DATA
 */
export function getInitialEmpData(date) {
  return {
    type: GET_DATA,
    date,
  };
}

/**
 * Retrieve Form References
 */
export function retrieveDataRefs() {
  return {
    type: DATA_REFS,
  };
}
export function retrieveDataRefsSuccess(type, data) {
  return {
    type,
    data,
  };
}

// export function retrieveDataRefsSuccess(formRefs, applFormRefs, onSpotEarnTypes, onSpotDeductTypes, timedEarnTypes, timedDeductTypes, govtFormReferrences) {
//   return {
//     type: DATA_REFSSUCCESS,
//     formRefs,
//     applFormRefs,
//     onSpotEarnTypes,
//     onSpotDeductTypes,
//     timedEarnTypes,
//     timedDeductTypes,
//     govtFormReferrences,
//   };
// }
export function retrieveDataRefsError(error) {
  return {
    type: DATA_REFSERROR,
    error,
  };
}

/**
 * Dispatch specific actions
 * @return {const} actionType  A const for specific return type
 * @param {array} data    An array of object from API
 * @param {object} pages  An object of page details
 */
export function getWriteSuccess(actionType, data, pages) {
  return {
    type: actionType,
    data,
    pages,
  };
}

/**
 * Dispatch specific actions
 * @return {object}       A const for specific return type
 * @param {object} error  An object when we encounter an error
 */
export function getWriteError(actionType, error) {
  return {
    type: actionType,
    error,
  };
}
