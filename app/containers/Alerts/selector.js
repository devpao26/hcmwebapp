/**
 * UserAccess selectors
 */

import { createSelector } from 'reselect';

const selectAlertNotifDomain = (state) => state.get('AlertsNotif');

/**
 * Selectors for the Alert Notif
 */
const makeSelectToggleModal = () => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.get('toggleModal')
);

const makeSelectIsAlert = () => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.get('isAlert')
);

const makeSelectEmpID = () => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.get('empID')
);

const makeSelectLoading = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectIsRead = () => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.get('isRead')
);

const makeSelectSuccess = (list) => createSelector(
  selectAlertNotifDomain,
  (substate) => substate.getIn([list, 'success'])
);

export {
  selectAlertNotifDomain,
  makeSelectToggleModal,
  makeSelectIsAlert,
  makeSelectEmpID,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectIsRead,
  makeSelectSuccess,
};
