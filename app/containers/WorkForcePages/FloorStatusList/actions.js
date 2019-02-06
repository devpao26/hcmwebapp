/*
 * Employee Floor Status List Actions
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
  EMP_LIST,
  EMP_SUCCESS,
  EMP_FAILED,
  EMP_SETID,
  SEARCH_FILTER,
  GET_TEAMS,
  GET_TEAMSSUCCESS,
  GET_TEAMSERROR,
  REQUEST_DTR,
  REQUEST_DTRSUCCESS,
  REQUEST_DTRERROR,
  CLEAR_URI,
} from './constants';

/**
 * Clear the state on unmount
 */
export function getClearState() {
  return {
    type: CLEAR_STATE,
  };
}

// Employee Masterlist Retrieval
export function retrieveEmpList(page, search) {
  return {
    type: EMP_LIST,
    page,
    search,
  };
}

export function retrievalSuccess(data, pageDetails) {
  return {
    type: EMP_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalFailed(error) {
  return {
    type: EMP_FAILED,
    error,
  };
}

// Set Employee Id
export function setEmpID(id) {
  return {
    type: EMP_SETID,
    id,
  };
}

// Search and Filter
export function searchAndFilterList(query) {
  return {
    type: SEARCH_FILTER,
    query,
  };
}

// Retrieve Team List for the Export
export function retrieveTeamList() {
  return {
    type: GET_TEAMS,
  };
}

export function retrieveTeamListSuccess(data) {
  return {
    type: GET_TEAMSSUCCESS,
    data,
  };
}

export function retrieveTeamListError(error) {
  return {
    type: GET_TEAMSERROR,
    error,
  };
}

// DTR Generate / Export
export function dtrExport(date, id) {
  return {
    type: REQUEST_DTR,
    date,
    id,
  };
}

export function dtrExportSuccess(uri) {
  return {
    type: REQUEST_DTRSUCCESS,
    uri,
  };
}

export function dtrExportError(error) {
  return {
    type: REQUEST_DTRERROR,
    error,
  };
}

export function clearDtrUri() {
  return {
    type: CLEAR_URI,
  };
}
