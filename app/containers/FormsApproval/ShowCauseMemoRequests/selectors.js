/**
 * Requests selectors
 */

import { createSelector } from 'reselect';

const selectFormApproval = (state) => state.get('ShowCauseMemoFormsRequests');

/**
 * Default selector used by Leave Request Form Page
 */
const makeSelectLoading = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPages = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectFormReqID = () => createSelector(
  selectFormApproval,
  (substate) => substate.getIn(['updateRequestStatus', 'formReqID'])
);

const makeSelectFormStatusID = () => createSelector(
  selectFormApproval,
  (substate) => substate.getIn(['updateRequestStatus', 'statusID'])
);

const makeSelectSearchValue = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'search'])
);

const makeSelectFilterValue = (list) => createSelector(
  selectFormApproval,
  (substate) => substate.getIn([list, 'filter'])
);

export {
  selectFormApproval,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectFormReqID,
  makeSelectFormStatusID,
  makeSelectSearchValue,
  makeSelectFilterValue,
};
