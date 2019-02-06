import { createSelector } from 'reselect';

/**
 * Direct selector to the workfoce state domain
 */
const selectWFPage = (state) => state.get('wfadmin');

/**
 * Default selectors used by Workforce
 */
const makeSelectEmpId = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', 'empId'])
);

const makeSelectDate = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', 'date'])
);

const makeSelectFilterBy = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', 'filter'])
);

const makeSelectEmpData = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empList', 'ObjectList'])
);

const makeSelectSummaryData = (summaryType) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', summaryType, 'data'])
);

const makeSelectLoading = (summaryType) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', summaryType, 'loading'])
);

const makeSelectError = (summaryType) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', summaryType, 'error'])
);

const makeSelectPages = (summaryType) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', summaryType, 'pages'])
);

const makeSelectPageIndex = (summaryType) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['empFloorStatus', summaryType, 'pageIndex'])
);

const makeSelectDtrUri = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['dtr', 'uri'])
);

const makeSelectDtrDate = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['dtr', 'date'])
);

export {
  selectWFPage,
  makeSelectEmpId,
  makeSelectDate,
  makeSelectFilterBy,
  makeSelectEmpData,
  makeSelectSummaryData,
  makeSelectLoading,
  makeSelectError,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectDtrUri,
  makeSelectDtrDate,
};
