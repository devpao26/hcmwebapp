/**
 * Workgroup selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the workgroup state domain
 */
const selectWorkgroupDomain = (state) => state.get('workgroup');

/**
 * Default selectors used by Workgroup
 */
const makeSelectLoading = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectSearch = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'search'])
);

const makeSelectID = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'id'])
);

const makeSelectIsTeam = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'isTeam'])
);

const makeSelectIsAll = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'isAll'])
);

const makeSelectIsEnrolled = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'isEnrolled'])
);

const makeSelectSuccess = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'success'])
);

const makeSelectName = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'name'])
);

const makeSelectTemplateID = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'templateID'])
);

const makeSelectTeamID = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'teamID'])
);

const makeSelectDeptID = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'deptID'])
);

const makeSelectAssignTo = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'assignTo'])
);

const makeSelectEmpID = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'empID'])
);

const makeSelectEmpStatus = (list) => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn([list, 'status'])
);

const makeSelectOldGroupID = () => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn(['transfer', 'oldGroupID'])
);

const makeSelectNewGroupID = () => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn(['transfer', 'newGroupID'])
);

const makeSelectOldIsTeam = () => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn(['transfer', 'oldIsTeam'])
);

const makeSelectNewIsTeam = () => createSelector(
  selectWorkgroupDomain,
  (substate) => substate.getIn(['transfer', 'newIsTeam'])
);

export {
  selectWorkgroupDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageIndex,
  makeSelectPageDetails,
  makeSelectSearch,
  makeSelectID,
  makeSelectIsTeam,
  makeSelectIsAll,
  makeSelectIsEnrolled,
  makeSelectSuccess,
  makeSelectName,
  makeSelectTemplateID,
  makeSelectTeamID,
  makeSelectDeptID,
  makeSelectAssignTo,
  makeSelectEmpID,
  makeSelectEmpStatus,
  makeSelectOldGroupID,
  makeSelectNewGroupID,
  makeSelectOldIsTeam,
  makeSelectNewIsTeam,
};
