import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile state domain
 */
const selectStateDomain = (state) => state.get('EMPProfileLeaves');
const selectEmpProfileDomain = (state) => state.get('EMPProfile');

/**
 * Default selector used by EmployeeProfile
 */
const makeSelectEmpID = () => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.get('empID')
);

const makeSelectEmpProfile = () => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn(['profile', 'data'])
);

const makeSelectLoading = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPages = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectFilter = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'filter'])
);

const makeSelectSearch = (list) => createSelector(
  selectStateDomain,
  (substate) => substate.getIn([list, 'search'])
);

const makeSelectLeavesData = () => createSelector(
  selectStateDomain,
  (substate) => substate.getIn(['updateLeaves', 'leavesData'])
);

const makeSelectLeavesUpdateSuccess = () => createSelector(
  selectStateDomain,
  (substate) => substate.getIn(['updateLeaves', 'success'])
);

export {
  selectStateDomain,
  makeSelectEmpID,
  makeSelectEmpProfile,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectFilter,
  makeSelectSearch,
  makeSelectLeavesData,
  makeSelectLeavesUpdateSuccess,
};
