/**
 * WorkForce Desktop Configurations selectors
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the workforce state domain
 */
const selectWFAdminDomain = (state) => state.get('wfadmin');

/**
 * Default selectors used by Workforce Desktop Configuration
 */
const makeSelectLoading = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'search'])
);

const makeSelectFilter = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'filter'])
);

const makeSelectID = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'id'])
);

const makeSelectSuccess = (list) => createSelector(
  selectWFAdminDomain,
  (substate) => substate.getIn(['desktopConfig', list, 'success'])
);

export {
  selectWFAdminDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectID,
  makeSelectSuccess,
};
