/**
 * WorkForce Floor Status List selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the workfoce state domain
 */
const selectWFPage = (state) => state.get('wfadmin');

/**
 * Default selectors used by Workforce
 */
const makeSelectLoading = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'loading'])
);

const makeSelectError = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'error'])
);

const makeSelectData = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'ObjectList'])
);

const makeSelectPageDetails = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'PageDetails'])
);

const makeSelectPageIndex = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'PageIndex'])
);

const makeSelectSearchValue = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'empList', 'SearchFilter', 'value'])
);

const makeSelectTeamLists = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'teamList', 'ObjectList'])
);

const makeSelectTeamListLoading = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'teamList', 'loading'])
);

const makeSelectTeamListError = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'teamList', 'error'])
);

const makeSelectDtrUri = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'dtr', 'uri'])
);

const makeSelectDtrDate = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'dtr', 'date'])
);

const makeSelectDtrTeamId = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['floorStatusList', 'dtr', 'teamId'])
);

export {
  selectWFPage,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearchValue,
  makeSelectTeamLists,
  makeSelectTeamListLoading,
  makeSelectTeamListError,
  makeSelectDtrUri,
  makeSelectDtrDate,
  makeSelectDtrTeamId,
};
