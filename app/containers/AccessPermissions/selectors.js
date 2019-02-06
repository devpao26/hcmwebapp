/**
 * Workgroup selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the workgroup state domain
 */
const selectAccessPermissionDomain = (state) => state.get('AccessPermissions');

/**
 * Default selectors used by Workgroup
 */
const makeSelectLoading = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectSearch = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'search'])
);

const makeSelectSuccess = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'success'])
);

const makeSelectID = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'id'])
);

const makeSelectEmpID = (list) => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn([list, 'empID'])
);

const makeSelectPermissions = () => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn(['refsList', 'permissions'])
);

const makeSelectTimeConst = () => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.getIn(['refsList', 'timeconst'])
);

const makeSelectIsGenAdmin = () => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.get('isGenAdmin')
);

const makeSelectRequester = () => createSelector(
  selectAccessPermissionDomain,
  (substate) => substate.get('adminRequester')
);

export {
  selectAccessPermissionDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageIndex,
  makeSelectPageDetails,
  makeSelectSearch,
  makeSelectSuccess,
  makeSelectID,
  makeSelectEmpID,
  makeSelectPermissions,
  makeSelectTimeConst,
  makeSelectIsGenAdmin,
  makeSelectRequester,
};
