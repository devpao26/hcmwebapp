/*
 * Employee Masterlist Actions
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
    DTREMP_LIST,
    DTREMP_SUCCESS,
    DTREMP_FAILED,
    DTR_EMP_INFO,
    DTR_EMP_SELDATE,
    DTR_SEL_EMPPROF,
    DTRINFO_FAILED,
    DTRINFO_SUCCESS,
    DTREMP_SHIFTRECLIST,
    DTREMP_SHIFTREC_SUCCESS,
    DTREMP_SHIFTREC_FAILED,
    DTR_REPORT,
    DTR_REPORT_SUCCESS,
    DTR_REPORT_FAILED,
    CLEAR_DTR_REPORT,
    MANUAL_DTR,
    MANUAL_DTRSUCCESS,
    MANUAL_DTRERROR,
    CLEAR_MANUAL_DTR,
  } from './constants';

// Employee Masterlist Retrieval
export function retrieveDTREmpList(page, search, filter) {
  return {
    type: DTREMP_LIST,
    page,
    search,
    filter,
  };
}

export function retrievalSuccess(data, pageDetails) {
  return {
    type: DTREMP_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalFailed(error) {
  return {
    type: DTREMP_FAILED,
    error,
  };
}

// Employee Shift Record/Summary Retrieval
export function retrieveDTREmpShiftRecs(page) {
  return {
    type: DTREMP_SHIFTRECLIST,
    page,
  };
}

export function retrievalShiftRecsSuccess(data, pageDetails) {
  return {
    type: DTREMP_SHIFTREC_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalShiftRecsFailed(error) {
  return {
    type: DTREMP_SHIFTREC_FAILED,
    error,
  };
}

// DTR Information Retrieval
export function retrieveDTRInfo() {
  return {
    type: DTR_EMP_INFO,
  };
}

export function retrieveSelDateEmpDTR(dateDTR) {
  return {
    type: DTR_EMP_SELDATE,
    dateDTR,
  };
}

export function retrieveSelEmpID(empID) {
  return {
    type: DTR_SEL_EMPPROF,
    empID,
  };
}

export function retrievalDTRInfoSuccess(data, pageDetails) {
  return {
    type: DTRINFO_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalDTRInfoFailed(error) {
  return {
    type: DTRINFO_FAILED,
    error,
  };
}

// DTR Report Retrieval
export function retrieveDTRReport() {
  return {
    type: DTR_REPORT,
  };
}

export function clearDTRReport() {
  return {
    type: CLEAR_DTR_REPORT,
  };
}

export function retrievalDTRReportSuccess(reportDetails) {
  return {
    type: DTR_REPORT_SUCCESS,
    reportDetails,
  };
}

export function retrievalDTRReportFailed(error) {
  return {
    type: DTR_REPORT_FAILED,
    error,
  };
}

/* Manual DTR Override */
export function manualDtrOverride(data) {
  return {
    type: MANUAL_DTR,
    data,
  };
}
export function manualDtrOverrideSuccess() {
  return {
    type: MANUAL_DTRSUCCESS,
  };
}
export function manualDtrOverrideError(error) {
  return {
    type: MANUAL_DTRERROR,
    error,
  };
}
export function clearManualDtrOverride() {
  return {
    type: CLEAR_MANUAL_DTR,
  };
}
