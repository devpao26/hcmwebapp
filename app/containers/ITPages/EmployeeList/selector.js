/**
 * UserAccess selectors
 */

import { createSelector } from 'reselect';

const selectITAdminPage = (state) => state.get('itadmin');

/**
 * Default selector used by IT Admin Masterlist
 */
const makeSelectLoading = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'search'])
);

const makeSelectFilter = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'filter'])
);

const makeSelectEmpID = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'empID'])
);

const makeSelectEmail = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'email'])
);

const makeSelectStatus = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'status'])
);

const makeSelectSuccess = (list) => createSelector(
  selectITAdminPage,
  (substate) => substate.getIn(['masterList', list, 'success'])
);

export {
  selectITAdminPage,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectEmpID,
  makeSelectEmail,
  makeSelectStatus,
  makeSelectSuccess,
};
