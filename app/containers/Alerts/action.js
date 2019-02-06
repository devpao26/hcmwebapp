/*
 * Alerts and Notification Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  RESET_STATE,
  TOGGLE_ALERTMODAL,
  GET_ALERTS,
  GET_ALERTS_SUCCESS,
  GET_ALERTS_ERROR,
  MARK_READ,
  MARK_READ_SUCCESS,
  MARK_READ_ERROR,
  UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,
} from './constants';

/**
 * Reset the State on component unmount
 * @return {object}   Returns an object with a type of RESET_STATE
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Show/Hide Modal of Alerts/Notifications
 * @param {string}  empID       Employee ID
 * @param {boolean} isShowing   Trigger to show/hide modal
 * @param {boolean} isAlert     Check if we are retrieving alerts or notification
 * @return {object}             Returns an object with a type of TOGGLE_ALERTMODAL
 */
export function toggleAlertModal(empID, isShowing, isAlert) {
  return {
    type: TOGGLE_ALERTMODAL,
    empID,
    isShowing,
    isAlert,
  };
}

/**
 * Get the Alerts/Notifications
 * @param {number}  page    Page number to be retriev
 * @return {object}         Returns an object with a type of GET_ALERTS
 */
export function getAlertsNotif(page, isRead) {
  return {
    type: GET_ALERTS,
    page,
    isRead,
  };
}
export function getAlertsNotifSuccess(data, pages) {
  return {
    type: GET_ALERTS_SUCCESS,
    data,
    pages,
  };
}
export function getAlertsNotifError(error) {
  return {
    type: GET_ALERTS_ERROR,
    error,
  };
}

/**
 * Mark the Alerts/Notif as read
 * @param {string}  id    ID of the alerts/notif
 * @return {object}       Returns an object with a type of MARK_READ
 */
export function getMarkAsRead(id) {
  return {
    type: MARK_READ,
    id,
  };
}
export function getMarkAsReadSuccess() {
  return {
    type: MARK_READ_SUCCESS,
  };
}
export function getMarkAsReadError(error) {
  return {
    type: MARK_READ_ERROR,
    error,
  };
}

/**
 * Update the Request Status (approve/reject)
 */
// Update Request Status
export function updateRequestStatus(data) {
  return {
    type: UPDATE_STATUS,
    data,
  };
}

export function updateRequestStatusSuccess() {
  return {
    type: UPDATE_STATUS_SUCCESS,
  };
}

export function updateRequestStatusError(error) {
  return {
    type: UPDATE_STATUS_ERROR,
    error,
  };
}
