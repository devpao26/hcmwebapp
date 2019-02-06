import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile COE state domain
 */
const selectCOEState = (state) => state.get('EMPProfileCOE');
const selectEMPProfileState = (state) => state.get('EMPProfile');

const makeSelectEmpID = () => createSelector(
  selectEMPProfileState,
  (substate) => substate.get('empID')
);

const makeSelectLoading = () => createSelector(
  selectCOEState,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectCOEState,
  (substate) => substate.get('error')
);

const makeSelectDatas = () => createSelector(
  selectCOEState,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectCOEState,
  (substate) => substate.get('pages')
);

const makeSelectPageIndex = () => createSelector(
  selectCOEState,
  (substate) => substate.get('pageIndex')
);

const makeSelectSearch = () => createSelector(
  selectCOEState,
  (substate) => substate.get('search')
);

export {
  selectCOEState,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
};
