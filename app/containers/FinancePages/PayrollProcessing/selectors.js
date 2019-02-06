/**
 * Finance DTR selectors
 */

import { createSelector } from 'reselect';

const selectPRadmin = (state) => state.get('pradmin');

/**
 * Default selector used by select Employee List
 */
const makeSelectLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'loading'])
);

const makeSelectError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'error'])
);

const makeSelectEmpListData = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'ObjectList'])
);

const makeSelectPageDetails = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'PageDetails'])
);

const makeSelectPageIndex = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'PageIndex'])
);

const makeSelectEmpSearch = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'search'])
);

const makeSelectEmpLocation = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'empList', 'location'])
);

/**
 * Default selector used by Payroll Processing Dates Retrieval
 */
const makeSelectPRPayDatesLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'loading'])
);

const makeSelectPRPayDatesError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'error'])
);

const makeSelectPRPayDateListData = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'ObjectList'])
);

// Retrieve Selected Month
const makeSelectPRPayMonth = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'selMonth'])
);

// Retrieve Selected Year
const makeSelectPRPayYear = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'selYear'])
);

// Retrieve Selected Payroll Pay Date
const makeSelectPRPayDate = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'prSelectedPayDate'])
);

// Retrieve Selected Employee Profile
const makeSelectPREmpSelProf = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayDates', 'prEmpProfileSelected'])
);

// Retrieve Payroll Review Info
const makeSelectPRPayReviewInfo = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayReview', 'ObjectList'])
);

// Retrieve Payroll Review Info Loading
const makeSelectPRPayReviewLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayReview', 'loading'])
);

// Retrieve Payroll Review Info Loading
const makeSelectPRPayReviewError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayReview', 'error'])
);


/**
 * Finance Payroll PayDay Report
 */

// Retrieve Payroll Review Info Loading
const makeSelectPRPayReport = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPayReport', 'ObjectList'])
);

/**
 * Generate Payslip for employee
 */
const makeSelectPayslipIsEmail = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPaySlip', 'isEmail'])
);

const makeSelectPayslipEmpID = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPaySlip', 'empID'])
);

const makeSelectPayslipDate = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPaySlip', 'date'])
);

const makeSelectPaySlipState = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', 'prPaySlip'])
);

/**
 * Employee On Spot Deduct
 */
const makeSelectOnSpotLoading = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', list, 'loading'])
);

const makeSelectOnSpotError = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', list, 'error'])
);

const makeSelectOnSpotData = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', list, 'data'])
);

const makeSelectOnSpotSuccess = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['payrollProcessing', list, 'success'])
);

export {
  selectPRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmpListData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectEmpSearch,
  makeSelectEmpLocation,
  makeSelectPRPayDatesLoading,
  makeSelectPRPayDatesError,
  makeSelectPRPayDateListData,
  makeSelectPRPayMonth,
  makeSelectPRPayYear,
  makeSelectPRPayDate,
  makeSelectPREmpSelProf,
  makeSelectPRPayReviewInfo,
  makeSelectPRPayReviewLoading,
  makeSelectPRPayReviewError,
  makeSelectPRPayReport,
  makeSelectPayslipIsEmail,
  makeSelectPayslipEmpID,
  makeSelectPayslipDate,
  makeSelectPaySlipState,
  makeSelectOnSpotLoading,
  makeSelectOnSpotError,
  makeSelectOnSpotData,
  makeSelectOnSpotSuccess,
};
