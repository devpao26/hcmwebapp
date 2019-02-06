import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile OT state domain
 */
const selectOTState = (state) => state.get('EMPProfileOT');
const selectEMPProfileState = (state) => state.get('EMPProfile');

const makeSelectEmpID = () => createSelector(
  selectEMPProfileState,
  (substate) => substate.get('empID')
);

const makeSelectLoading = () => createSelector(
  selectOTState,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectOTState,
  (substate) => substate.get('error')
);

const makeSelectDatas = () => createSelector(
  selectOTState,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectOTState,
  (substate) => substate.get('pages')
);

const makeSelectPageIndex = () => createSelector(
  selectOTState,
  (substate) => substate.get('pageIndex')
);

const makeSelectSearch = () => createSelector(
  selectOTState,
  (substate) => substate.get('search')
);

export {
  selectOTState,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
};
