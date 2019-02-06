/**
 * ShiftTemplate Selectors
 */
import { createSelector } from 'reselect';

const selectWFPage = (state) => state.get('wfadmin');

/**
 * Default selector used by ShiftTemplate
 */

const makeSelectData = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'data'])
);

const makeSelectListsLoading = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'loading'])
);

const makeSelectListsError = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'error'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'pageIndex'])
);

const makeSelectSearchQuery = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'search'])
);

const makeSelectSortList = (list) => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', list, 'sort'])
);

const makeSelectShiftTemplateID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'shiftTemplateID'])
);

const makeSelectRequester = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'enrolledList', 'requester'])
);

const makeSelectFlexiRefs = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'flexiRefs'])
);

const makeSelectSaveShiftTemplateData = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'shiftTemplateSaving', 'shiftTemplateData'])
);

const makeSelectIsNewShiftTemplate = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'shiftTemplateSaving', 'isNewShiftTemplate'])
);

const makeSelectSaveShiftTemplateLoading = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'shiftTemplateSaving', 'loading'])
);

const makeSelectSaveShiftTemplateError = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'shiftTemplateSaving', 'error'])
);

const makeSelectDeleteTemplateSuccess = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'deleteSuccess'])
);

const makeSelectAddToTemplateRequester = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'addToList', 'requestCat'])
);

const makeSelectAddToID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'addToTemplate', 'addToId'])
);

const makeSelectUnassignID = () => createSelector(
  selectWFPage,
  (substate) => substate.getIn(['shiftTemplate', 'unassignTemplate', 'idToUnassign'])
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
  makeSelectShiftTemplateID,
  makeSelectRequester,
  makeSelectFlexiRefs,
  makeSelectSaveShiftTemplateData,
  makeSelectSaveShiftTemplateLoading,
  makeSelectSaveShiftTemplateError,
  makeSelectIsNewShiftTemplate,
  makeSelectDeleteTemplateSuccess,
  makeSelectAddToTemplateRequester,
  makeSelectAddToID,
  makeSelectUnassignID,
};
