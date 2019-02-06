import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile state domain
 */
const selectEmpProfileDomain = (state) => state.get('EMPProfile');

/**
 * Other specific selectors
 */
const selectHomeStateDomain = (state) => state.get('home');
const makeSelectFormRefs = () => createSelector(
  selectHomeStateDomain,
  (substate) => substate.getIn(['refsList', 'formLoad'])
);
const makeSelectApplRefs = () => createSelector(
  selectHomeStateDomain,
  (substate) => substate.getIn(['refsList', 'applForm'])
);

/**
 * Default selector used by EmployeeProfile
 */
const makeSelectEmpID = () => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.get('empID')
);

const makeSelectLoading = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPages = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectSuccess = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'success'])
);

const makeSelectListSelItem = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'selectedItem'])
);

const makeSelectFilter = (list) => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn([list, 'filter'])
);

const makeSelectLeavesData = () => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn(['updateLeaves', 'leavesData'])
);

const makeSelectLeavesUpdateSuccess = () => createSelector(
  selectEmpProfileDomain,
  (substate) => substate.getIn(['updateLeaves', 'success'])
);

export {
  selectHomeStateDomain,
  makeSelectFormRefs,
  makeSelectApplRefs,
  selectEmpProfileDomain,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSuccess,
  makeSelectFilter,
  makeSelectLeavesData,
  makeSelectLeavesUpdateSuccess,
  makeSelectListSelItem,
};
