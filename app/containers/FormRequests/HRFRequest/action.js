/*
 * App Actions Creators
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
    CREATE_FORM,
    CREATE_FORM_SUCCESS,
    CREATE_FORM_ERROR,
    CREATE_FORM_RESET,
  } from './constants';

/**
 * Submit Termination Form request form
 */
// export function createFormRequest(jobtitle, joblvlid, empstatusid, jobdescr, locationid, jobskillsid, jobassesmentid, minsalary, maxsalary) {
//   return {
//     type: CREATE_FORM,
//     jobtitle,
//     joblvlid,
//     empstatusid,
//     jobdescr,
//     locationid,
//     jobskillsid,
//     jobassesmentid,
//     minsalary,
//     maxsalary,
//   };
// }
export function createFormRequest(data) {
  return {
    type: CREATE_FORM,
    data,
  };
}
export function createFormRequestSuccess(resp) {
  return {
    type: CREATE_FORM_SUCCESS,
    resp,
  };
}
export function createFormRequestError(resp) {
  return {
    type: CREATE_FORM_ERROR,
    resp,
  };
}
export function createFormRequestReset() {
  return {
    type: CREATE_FORM_RESET,
  };
}

