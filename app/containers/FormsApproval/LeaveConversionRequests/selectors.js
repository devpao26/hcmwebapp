/**
 * LCF Requests selectors
 */

import { createSelector } from 'reselect';

const selectFormApproval = (state) => state.get('LCFRequests');

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

const makeSelectSearchValue = () => createSelector(
  selectFormApproval,
  (substate) => substate.getIn(['formLists', 'search'])
);

const makeSelectFilterValue = () => createSelector(
  selectFormApproval,
  (substate) => substate.getIn(['formLists', 'filter'])
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
