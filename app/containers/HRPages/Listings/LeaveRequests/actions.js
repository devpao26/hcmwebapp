/*
 * Forms Approval Actions
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
  GET_LEAVEREQLIST,
  GET_LEAVEREQLISTSUCCESS,
  GET_LEAVEREQLISTERROR,
  RESET_STATE,
} from './constants';

// Retrieve Leave Request List
export function getLeaveRequestList(search, filter, page) {
  return {
    type: GET_LEAVEREQLIST,
    search,
    filter,
    page,
  };
}

export function getLeaveRequestListSuccess(data, pages) {
  return {
    type: GET_LEAVEREQLISTSUCCESS,
    data,
    pages,
  };
}

export function getLeaveRequestListError(error) {
  return {
    type: GET_LEAVEREQLISTERROR,
    error,
  };
}

/**
 * Reset the Component State on Unmount
 * @return {object} Returns an object with a type of RESET_STATE
 */
export function resetFormState() {
  return {
    type: RESET_STATE,
  };
}
