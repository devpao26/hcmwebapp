/**
 * Finance DTR selectors
 */

import { createSelector } from 'reselect';

const selectPRadmin = (state) => state.get('pradmin');

/**
 * Default selector used by select Employee List
 */
const makeSelectLoading = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'PageDetails'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'PageIndex'])
);

const makeSelectSearch = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empList', 'search'])
);

const makeSelectFilter = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empList', 'filter'])
);

const makeSelectSuccess = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', list, 'success'])
);

/**
 * Default selector used by Employee Shift Record/Summary
 */
const makeSelectShiftRecsLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empShiftRecs', 'loading'])
);

const makeSelectShiftRecsError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empShiftRecs', 'error'])
);

const makeSelectShiftRecsData = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empShiftRecs', 'ObjectList'])
);

const makeSelectShiftRecsPages = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empShiftRecs', 'PageDetails'])
);

const makeSelectShiftRecsPageIndex = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empShiftRecs', 'PageIndex'])
);

/**
 * Default selector used for Employee DTR Retrieval
 */
const makeSelectDTREmpInfo = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empDtrInfo', 'ObjectList'])
);

const makeSelectDTRLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empDtrInfo', 'loading'])
);

const makeSelectDTRError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empDtrInfo', 'error'])
);

const makeSelectedDTRDateEmp = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empDtrInfo', 'selDateDTREmp'])
);

const makeSelectEmpID = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'empID'])
);

/**
 * Default selector used by DTR Report
 */
const makeSelectDTRReportLoading = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'dtrReport', 'loading'])
);

const makeSelectSDTRReportError = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'dtrReport', 'error'])
);

const makeSelectDTRReport = () => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['dtr', 'dtrReport', 'ObjectList'])
);

export {
  selectPRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectSuccess,
  makeSelectDTREmpInfo,
  makeSelectDTRLoading,
  makeSelectDTRError,
  makeSelectedDTRDateEmp,
  makeSelectEmpID,
  makeSelectShiftRecsLoading,
  makeSelectShiftRecsError,
  makeSelectShiftRecsData,
  makeSelectShiftRecsPages,
  makeSelectShiftRecsPageIndex,
  makeSelectDTRReportLoading,
  makeSelectSDTRReportError,
  makeSelectDTRReport,
};
