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
    CREATE_OTFORMS,
    SUCCESS_OTFORMS,
    ERROR_OTFORMS,
    DISMISS_OTFORMS,
    RETRIEVE_OTFORMS,
    RETRIEVE_OTFORMSUCCESS,
    RESET_STATE,
  } from './constants';

/**
 * Create OT Forms, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function createOTFOrms(data) {
  return {
    type: CREATE_OTFORMS,
    data,
  };
}
export function retrieveOTForms(startdate) {
  return {
    type: RETRIEVE_OTFORMS,
    startdate,
  };
}
export function retrieveOTFormSuccess(data) {
  return {
    type: RETRIEVE_OTFORMSUCCESS,
    data,
  };
}
export function successOTForms(successcode, succesmsg) {
  return {
    type: SUCCESS_OTFORMS,
    successcode,
    succesmsg,
  };
}
export function errorOTForms(errorcode, errormsg) {
  return {
    type: ERROR_OTFORMS,
    errorcode,
    errormsg,
  };
}
export function dismissOTForms() {
  return {
    type: DISMISS_OTFORMS,
  };
}

/**
 * Reset State
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}
