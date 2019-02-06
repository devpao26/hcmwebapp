/**
 * Workstatus selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct select to the hr state domain
 */
const selectHRadmin = (state) => state.get('hradmin');

/**
 * Default selectors used by CompenBen Template
 */
const makeSelectLoading = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'data'])
);

const makeSelectPages = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'search'])
);

const makeSelectSort = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', list, 'sortBy'])
);

const makeSelectTemplateID = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', 'templateID'])
);

const makeSelectAssignEmpID = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', 'addToTemplate', 'empID'])
);

const makeSelectUnassignEmpID = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', 'unAssignList', 'empID'])
);

const makeSelectTemplateData = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', 'editNewTemplate', 'templateData'])
);

const makeSelectTemplateIsNew = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['compenBen', 'editNewTemplate', 'isNew'])
);

export {
  selectHRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectSort,
  makeSelectTemplateID,
  makeSelectAssignEmpID,
  makeSelectUnassignEmpID,
  makeSelectTemplateData,
  makeSelectTemplateIsNew,
};
