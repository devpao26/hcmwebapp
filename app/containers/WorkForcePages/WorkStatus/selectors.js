/**
 * Workstatus selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the workforce state domain
 */
const selectWFPage = (state) => state.get('wfadmin');

/**
 * Default selectors used by Workforce
 */
const makeSelectData = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'data'])
);

const makeSelectListsLoading = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'loading'])
);

const makeSelectListsError = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'error'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'pageIndex'])
);

const makeSelectSearchQuery = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'search'])
);

const makeSelectSortList = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', list, 'sort'])
);

const makeSelectWorkStatusTemplateID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'workStatusTemplateID'])
);

const makeSelectRequester = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'enrolledList', 'requester'])
);

const makeSelectAddToTemplateRequester = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'addToList', 'requestCat'])
);

const makeSelectAddToID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'addToTemplate', 'addToId'])
);

const makeSelectDeleteTemplateSuccess = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'deleteSuccess'])
);

const makeSelectSaveTemplateData = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'templateSaving', 'templateData'])
);

const makeSelectIsNewTemplate = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'templateSaving', 'isNewTemplate'])
);

const makeSelectUnassignID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['workStatusTemplate', 'unassignTemplate', 'idToUnassign'])
);

export {
  selectWFPage,
  makeSelectData,
  makeSelectListsLoading,
  makeSelectListsError,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearchQuery,
  makeSelectSortList,
  makeSelectWorkStatusTemplateID,
  makeSelectRequester,
  makeSelectAddToTemplateRequester,
  makeSelectAddToID,
  makeSelectDeleteTemplateSuccess,
  makeSelectSaveTemplateData,
  makeSelectIsNewTemplate,
  makeSelectUnassignID,
};
