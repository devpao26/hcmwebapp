/*
 * Leave Request Actions
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
  GET_DATAS,
  GET_LEAVEREQLIST,
  GET_LEAVEREQLISTSUCCESS,
  GET_LEAVEREQLISTERROR,
  GET_FORMLOAD,
  GET_FORMLOADSUCCESS,
  GET_FORMLOADERROR,
  CREATE_REQUEST,
  CREATE_REQUESTSUCCESS,
  CREATE_REQUESTERROR,
  CLEAR_REQUEST,
  RESET_STATE,
} from './constants';

// Initial Data Retrieval
export function getDatas(empID, page) {
  return {
    type: GET_DATAS,
    empID,
    page,
  };
}

// Get Leave Request List
export function getLeaveReqList(page) {
  return {
    type: GET_LEAVEREQLIST,
    page,
  };
}

export function getLeaveReqListSuccess(data, pages) {
  return {
    type: GET_LEAVEREQLISTSUCCESS,
    data,
    pages,
  };
}

export function getLeaveReqListError(error) {
  return {
    type: GET_LEAVEREQLISTERROR,
    error,
  };
}

// Get WorkFlow Form Load
export function getWorkFlowFormLoad() {
  return {
    type: GET_FORMLOAD,
  };
}

export function getWorkFlowFormLoadSuccess(data) {
  return {
    type: GET_FORMLOADSUCCESS,
    data,
  };
}

export function getWorkFlowFormLoadError(error) {
  return {
    type: GET_FORMLOADERROR,
    error,
  };
}

// Create Leave Request
export function createLeaveRequest(data, files) {
  return {
    type: CREATE_REQUEST,
    data,
    files,
  };
}

export function createLeaveRequestSuccess(response) {
  return {
    type: CREATE_REQUESTSUCCESS,
    response,
  };
}

export function createLeaveRequestError(error) {
  return {
    type: CREATE_REQUESTERROR,
    error,
  };
}

export function clearLeaveRequest() {
  return {
    type: CLEAR_REQUEST,
  };
}

// Reset Form State
export function resetFormState() {
  return {
    type: RESET_STATE,
  };
}
