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
  RequestList,
  RESET_STATE,
} from './constants';

// Retrieve Leave Request List
export function getRequestLists(type, search, filter, page) {
  return {
    type,
    search,
    filter,
    page,
  };
}

export function getRequestListsSuccess(data, pages) {
  return {
    type: RequestList.SUCCESS,
    data,
    pages,
  };
}

export function getRequestListsError(error) {
  return {
    type: RequestList.ERROR,
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
