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
  LIST_JOSSUCCESS,
  LIST_JOSFAILED,
  LIST_JOS,
  MOVED_SUCCESS,
  CHANGE_JOSTAT,
  WRITE_IDS,
  IS_NOTIF,
  SEARCH_FILTER,
} from './constants';

// JO Signed Applicant List Retrieval
export function retrieveJoSignedList(page, loc, search) {
  return {
    type: LIST_JOS,
    page,
    loc,
    search,
  };
}

export function retrieveJoSignedListSuccess(jolist, jolistpages) {
  return {
    type: LIST_JOSSUCCESS,
    jolist,
    jolistpages,
  };
}

export function retrieveJoSignedLisError(error) {
  return {
    type: LIST_JOSFAILED,
    error,
  };
}

// Change Applicant JO Status (PPE, RPA, PPS, RPL)
export function changeApplJoStatus() {
  return {
    type: CHANGE_JOSTAT,
  };
}

// Write the Applicant Job ID and JO Status ID in state
export function writeApplIds(jobId, joStatId) {
  return {
    type: WRITE_IDS,
    jobId,
    joStatId,
  };
}

// If applicant JO status is marked as PPE, redirect to PPE page
export function redirectToPpe() {
  return {
    type: MOVED_SUCCESS,
  };
}

// Show/Hide our success notification
export function showHideJoStatSuccess(notif, status) {
  return {
    type: IS_NOTIF,
    notif,
    status,
  };
}

// Search and Filter
export function searchAndFilterList(loc, input) {
  return {
    type: SEARCH_FILTER,
    loc,
    input,
  };
}
