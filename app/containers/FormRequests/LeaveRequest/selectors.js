/**
 * Leave Request selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectFormRequest = (state) => state.get('Forms');

/**
 * Select User Employee ID on global state
 */
const makeSelectUserData = () => createSelector(
  selectGlobal,
  (substate) => substate.get('userData')
);

/**
 * Default selector used by Leave Request Form Page
 */
const makeSelectLoading = (list) => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', list, 'data'])
);

const makeSelectPages = (list) => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', list, 'pageIndex'])
);

const makeSelectEmployeeID = () => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', 'employeeID'])
);

const makeSelectCreateData = () => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', 'saveRequest', 'createData'])
);

const makeSelectCreateFiles = () => createSelector(
  selectFormRequest,
  (substate) => substate.getIn(['leaveRequest', 'saveRequest', 'createFiles'])
);

export {
  makeSelectUserData,
  selectFormRequest,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectEmployeeID,
  makeSelectCreateData,
  makeSelectCreateFiles,
};
