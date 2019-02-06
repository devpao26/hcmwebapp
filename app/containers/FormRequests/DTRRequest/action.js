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
    CREATE_FORMS,
    SUCCESS_FORMS,
    ERROR_FORMS,
    DISMISS_FORMS,
    RETRIEVE_FORMS,
    RETRIEVE_FORMSUCCESS,
    RESET_STATE,
  } from './constants';

/**
 * Create Forms, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function createFOrms(data) {
  return {
    type: CREATE_FORMS,
    data,
  };
}
export function retrieveForms(startdate) {
  return {
    type: RETRIEVE_FORMS,
    startdate,
  };
}
export function retrieveFormSuccess(data) {
  return {
    type: RETRIEVE_FORMSUCCESS,
    data,
  };
}
export function successForms(successcode, succesmsg) {
  return {
    type: SUCCESS_FORMS,
    successcode,
    succesmsg,
  };
}
export function errorForms(errorcode, errormsg) {
  return {
    type: ERROR_FORMS,
    errorcode,
    errormsg,
  };
}
export function dismissForms() {
  return {
    type: DISMISS_FORMS,
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
