/*
 * SHIFT Requests Actions
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
  GET_LIST,
  GET_LISTSUCCESS,
  GET_LISTERROR,
  UPDATE_REQUEST,
  UPDATE_REQUESTSUCCESS,
  UPDATE_REQUESTERROR,
  CLEAR_UPDATEREQUEST,
  RESET_STATE,
} from './constants';

/**
 * Get SHIFT Lists
 * @param {number}  page    Page Index to be retrieved
 * @param {string}  search  Search value
 * @param {string}  filter  Status filter
 * @return {object}         Returns an object with a type of GET_COELIST
 */
export function getListRequests(search, filter, page) {
  return {
    type: GET_LIST,
    search,
    filter,
    page,
  };
}

/**
 * Get SHIFT Lists Success
 * @param {object}  data   Object list of data retrieved
 * @param {object}  pages  Page details
 * @return {object}         Returns an object with a type of GET_COELISTSUCCESS
 */
export function getListRequestSuccess(data, pages) {
  return {
    type: GET_LISTSUCCESS,
    data,
    pages,
  };
}

/**
 * Get SHIFT Lists Error
 * @param {error}   error   Error details
 * @return {object}         Returns an object with a type of GET_COELISTERROR
 */
export function getListRequestError(error) {
  return {
    type: GET_LISTERROR,
    error,
  };
}

/**
 * Update Form Request Status
 * @param {string}  formReqID   Request form ID
 * @param {string}  statusID    Update status id
 * @return {object}             Return an object with a type of UPDATE_REQUEST
 */
export function updateRequestStatus(formReqID, statusID) {
  return {
    type: UPDATE_REQUEST,
    formReqID,
    statusID,
  };
}

/**
 * Update Form Request Status Success
 * @return {object} Return an object with a type of UPDATE_REQUESTSUCCESS
 */
export function updateRequestStatusSuccess() {
  return {
    type: UPDATE_REQUESTSUCCESS,
  };
}

/**
 * Update Form Request Status Error
 * @param {object} error  Error Details
 * @return {object} Return an object with a type of UPDATE_REQUESTERROR
 */
export function updateRequestStatusError(error) {
  return {
    type: UPDATE_REQUESTERROR,
    error,
  };
}

/**
 * Clear the Update Status Request
 * @return {object}   Returns an object with a type of CLEAR_UPDATEREQUEST
 */
export function clearUpdateRequest() {
  return {
    type: CLEAR_UPDATEREQUEST,
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
