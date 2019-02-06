import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile IRF state domain
 */
const selectIRFState = (state) => state.get('EMPProfileIRF');
const selectEMPProfileState = (state) => state.get('EMPProfile');

const makeSelectEmpID = () => createSelector(
  selectEMPProfileState,
  (substate) => substate.get('empID')
);

const makeSelectLoading = () => createSelector(
  selectIRFState,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectIRFState,
  (substate) => substate.get('error')
);

const makeSelectDatas = () => createSelector(
  selectIRFState,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectIRFState,
  (substate) => substate.get('pages')
);

const makeSelectPageIndex = () => createSelector(
  selectIRFState,
  (substate) => substate.get('pageIndex')
);

const makeSelectSearch = () => createSelector(
  selectIRFState,
  (substate) => substate.get('search')
);

export {
  selectIRFState,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
};
