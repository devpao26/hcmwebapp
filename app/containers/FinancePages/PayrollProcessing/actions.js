/*
 * Payroll Processing Actions
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
  PREMP_LIST,
  PREMP_SUCCESS,
  PREMP_FAILED,
  PAYROLLDATE_LIST,
  PAYROLLDATE_SUCCESS,
  PAYROLLDATE_FAILED,
  PRDATE_SELECTED,
  PREMP_SELECTED,
  PRPAY_SELECTED_MN,
  PRPAY_SELECTED_YR,
  PRPAYDAY_INFO,
  PRPAYDAY_SUCCESS,
  PRPAYDAY_FAILED,
  PRREVIEW,
  PRREVIEW_SUCCESS,
  PRREVIEW_FAILED,
  GEN_PAYSLIP,
  GEN_PAYSLIPSUCCESS,
  GEN_PAYSLIPERROR,
  RESET_PAYSLIP,
  EMP_ONSPOTDEDUCT,
  EMP_ONSPOTDEDUCTSUCCESS,
  EMP_ONSPOTDEDUCTERROR,
  EMP_ONSPOTEARNING,
  EMP_ONSPOTEARNINGSUCCESS,
  EMP_ONSPOTEARNINGERROR,
} from './constants';

/**
 * Retrieval of Employee list
 * @param {number}  page      Page Index of data to be retrieved
 * @param {string}  search    Search value to be retrieved
 * @param {string}  location  Location filter the employee list
 * @return {object}           Returns an object with a type of PREMP_LIST
 */
export function retrieveDTREmpList(page, search, location) {
  return {
    type: PREMP_LIST,
    page,
    search,
    location,
  };
}

export function retrievalSuccess(data, pageDetails) {
  return {
    type: PREMP_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalFailed(error) {
  return {
    type: PREMP_FAILED,
    error,
  };
}

// Payroll Dates Retrieval
export function retrievePRDateList(page) {
  return {
    type: PAYROLLDATE_LIST,
    page,
  };
}

export function retrievalPRDatesSuccess(data, pageDetails) {
  return {
    type: PAYROLLDATE_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalPRDatesFailed(error) {
  return {
    type: PAYROLLDATE_FAILED,
    error,
  };
}

// Payroll Pay Day Info Retrieval

export function setPRDateSelected(date) {
  return {
    type: PRDATE_SELECTED,
    date,
  };
}

export function setPRPayMonthSelected(month) {
  return {
    type: PRPAY_SELECTED_MN,
    month,
  };
}

export function setPRPayYearSelected(year) {
  return {
    type: PRPAY_SELECTED_YR,
    year,
  };
}

// Set Selected Employee Profile
export function setPREmpProfileSelected(empProfSelected) {
  return {
    type: PREMP_SELECTED,
    empProfSelected,
  };
}

/**
 * Payroll Review Actions
 */
export function retrievePayReviewInfo() {
  return {
    type: PRPAYDAY_INFO,
  };
}

export function retrievePayReviewSuccess(data, pageDetails) {
  return {
    type: PRPAYDAY_SUCCESS,
    data,
    pageDetails,
  };
}

export function retrievePayReviewFailed(error) {
  return {
    type: PRPAYDAY_FAILED,
    error,
  };
}

/**
 * Finance Payroll Review Report Processing
 */
export function retrievePayReviewReport() {
  return {
    type: PRREVIEW,
  };
}

export function retrievePayReviewReportSuccess(data) {
  return {
    type: PRREVIEW_SUCCESS,
    data,
  };
}

export function retrievePayReviewReportFailed(error) {
  return {
    type: PRREVIEW_FAILED,
    error,
  };
}

/**
 * Generate Payslip for employee actions
 */
export function generatePaySlip(isEmail, empID, date) {
  return {
    type: GEN_PAYSLIP,
    isEmail,
    empID,
    date,
  };
}

export function generatePaySlipSuccess(data) {
  return {
    type: GEN_PAYSLIPSUCCESS,
    data,
  };
}

export function generatePaySlipError(error) {
  return {
    type: GEN_PAYSLIPERROR,
    error,
  };
}

export function resetPaySlipState() {
  return {
    type: RESET_PAYSLIP,
  };
}

/**
 * File On Spot deduct for employee
 */
export function empOnSpotDeduct(data) {
  return {
    type: EMP_ONSPOTDEDUCT,
    data,
  };
}
export function empOnSpotDeductSuccess() {
  return {
    type: EMP_ONSPOTDEDUCTSUCCESS,
  };
}
export function empOnSpotDeductError(error) {
  return {
    type: EMP_ONSPOTDEDUCTERROR,
    error,
  };
}

/**
 * File On Spot Earning for employee
 */
export function empOnSpotEarning(data) {
  return {
    type: EMP_ONSPOTEARNING,
    data,
  };
}
export function empOnSpotEarningSuccess() {
  return {
    type: EMP_ONSPOTEARNINGSUCCESS,
  };
}
export function empOnSpotEarningError(error) {
  return {
    type: EMP_ONSPOTEARNINGERROR,
    error,
  };
}
