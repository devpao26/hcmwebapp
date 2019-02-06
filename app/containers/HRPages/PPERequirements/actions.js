/*
 * OnBoarding Actions
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
  API_SUCCESS,
  API_FAILED,
  LIST_PPE,
  GET_PPEREQ,
  GET_PPEREQSUCCESS,
  GET_PPEREQERROR,
  UPDATE_ISREQ,
  UPLOAD_FILES,
  UPLOAD_FILESSUCCESS,
  UPLOAD_FILESERROR,
  DELETE_FILE,
  UPDATE_REQSTATUS,
  APPL_EMP,
  MIGRATE_SUCCESS,
  SEARCH_FILTER,
} from './constants';

// Default Action - Data retrieval on component mount
export function retrieveJoSignedList(page, loc, search, unprocessed) {
  return {
    type: LIST_PPE,
    page,
    loc,
    search,
    unprocessed,
  };
}

// Success API
export function retrieveSuccess(jolist, pages) {
  return {
    type: API_SUCCESS,
    jolist,
    pages,
  };
}

// Error in API, will show component notification
export function retrieveError(error) {
  return {
    type: API_FAILED,
    error,
  };
}

// Request our Applicant Requirement List
export function reqApplReqList(applJobId) {
  return {
    type: GET_PPEREQ,
    applJobId,
  };
}

export function reqApplReqListSuccess(data) {
  return {
    type: GET_PPEREQSUCCESS,
    data,
  };
}

export function reqApplReqListError(error) {
  return {
    type: GET_PPEREQERROR,
    error,
  };
}

// Update Requirement List IsRequired key
export function reqUpdateIsRequired(reqId, arg) {
  return {
    type: UPDATE_ISREQ,
    reqId,
    arg,
  };
}

// Upload files
export function uploadReqFiles(files, reqid, jofiles) {
  return {
    type: UPLOAD_FILES,
    files,
    reqid,
    jofiles,
  };
}

export function uploadSuccess() {
  return {
    type: UPLOAD_FILESSUCCESS,
  };
}

export function uploadFailed(error) {
  return {
    type: UPLOAD_FILESERROR,
    error,
  };
}

// Delete File
export function deleteFile(fileid, attachtype) {
  return {
    type: DELETE_FILE,
    fileid,
    attachtype,
  };
}

// Update Requirement List Uploaded File Status
export function updateReqStatus(reqid, reqstatid) {
  return {
    type: UPDATE_REQSTATUS,
    reqid,
    reqstatid,
  };
}

// Migrate Applicant
export function migrateApplicant() {
  return {
    type: APPL_EMP,
  };
}

export function migrateSuccessfull() {
  return {
    type: MIGRATE_SUCCESS,
  };
}

// Search and Filter
export function searchAndFilterList(loc, input, unprocessed) {
  return {
    type: SEARCH_FILTER,
    loc,
    input,
    unprocessed,
  };
}
