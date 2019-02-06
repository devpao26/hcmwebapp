import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile OT state domain
 */
const selectATTStateDomain = (state) => state.get('EMPProfileAttendance');
const selectEMPProfileState = (state) => state.get('EMPProfile');

const makeSelectEmpID = () => createSelector(
  selectEMPProfileState,
  (substate) => substate.get('empID')
);

const makeSelectLoading = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('error')
);

const makeSelectDatas = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('pages')
);

const makeSelectPageIndex = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('pageIndex')
);

const makeSelectSearch = () => createSelector(
  selectATTStateDomain,
  (substate) => substate.get('search')
);

export {
  selectATTStateDomain,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
};
