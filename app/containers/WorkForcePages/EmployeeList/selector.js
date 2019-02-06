/**
 * UserAccess selectors
 */

import { createSelector } from 'reselect';

const selectWFAdminDomain = (state) => state.get('wfadmin');

/**
 * Default selector used by TestPage
 */
const makeSelectLoading = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'search'])
);

const makeSelectEmpID = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'empID'])
);

const makeSelectSuccess = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['masterList', list, 'success'])
);

export {
  selectWFAdminDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectEmpID,
  makeSelectSuccess,
};

