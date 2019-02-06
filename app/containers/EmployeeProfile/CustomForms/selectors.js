import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile OT state domain
 */
const selectCustomFormState = (state) => state.get('EMPProfileCustomForms');
const selectEMPProfileState = (state) => state.get('EMPProfile');

const makeSelectEmpID = () => createSelector(
  selectEMPProfileState,
  (substate) => substate.get('empID')
);

const makeSelectLoading = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('error')
);

const makeSelectDatas = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('pages')
);

const makeSelectPageIndex = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('pageIndex')
);

const makeSelectSearch = () => createSelector(
  selectCustomFormState,
  (substate) => substate.get('search')
);

export {
  selectCustomFormState,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
};
