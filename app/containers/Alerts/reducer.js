/*
 * Alerts and Notification Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

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

// The initial state of the App
const initialState = fromJS({
  toggleModal: false,
  isAlert: false,
  empID: false,
  isRead: false,
  alertsNotif: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
  },
  markRead: {
    loading: false,
    error: false,
    data: false,
    success: false,
  },
  updateStatus: {
    loading: false,
    error: false,
    data: false,
    success: false,
  },
});

function alertsNotifReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case TOGGLE_ALERTMODAL:
      return state
        .set('toggleModal', action.isShowing)
        .set('isAlert', action.isAlert)
        .set('empID', action.empID)
        .set('isRead', false)
        .setIn(['alertsNotif', 'loading'], false)
        .setIn(['alertsNotif', 'data'], false)
        .setIn(['alertsNotif', 'pages'], false)
        .setIn(['alertsNotif', 'error'], false)
        .setIn(['alertsNotif', 'pageIndex'], 1);
    case GET_ALERTS:
      return state
        .set('isRead', action.isRead)
        .setIn(['alertsNotif', 'loading'], true)
        .setIn(['alertsNotif', 'error'], false)
        .setIn(['alertsNotif', 'data'], false)
        .setIn(['alertsNotif', 'pageIndex'], action.page);
    case GET_ALERTS_SUCCESS:
      return state
        .setIn(['alertsNotif', 'loading'], false)
        .setIn(['alertsNotif', 'data'], action.data)
        .setIn(['alertsNotif', 'pages'], action.pages);
    case GET_ALERTS_ERROR:
      return state
        .setIn(['alertsNotif', 'loading'], false)
        .setIn(['alertsNotif', 'data'], false)
        .setIn(['alertsNotif', 'pages'], false)
        .setIn(['alertsNotif', 'error'], action.error);
    case MARK_READ:
      return state
        .setIn(['markRead', 'loading'], true)
        .setIn(['markRead', 'error'], false)
        .setIn(['markRead', 'success'], false)
        .setIn(['markRead', 'data'], action.id);
    case MARK_READ_SUCCESS:
      return state
        .setIn(['markRead', 'loading'], false)
        .setIn(['markRead', 'data'], false)
        .setIn(['markRead', 'success'], true);
    case MARK_READ_ERROR:
      return state
        .setIn(['markRead', 'loading'], false)
        .setIn(['markRead', 'success'], false)
        .setIn(['markRead', 'data'], false)
        .setIn(['markRead', 'error'], action.error);
    case UPDATE_STATUS:
      return state
        .setIn(['updateStatus', 'loading'], true)
        .setIn(['updateStatus', 'error'], false)
        .setIn(['updateStatus', 'success'], false)
        .setIn(['updateStatus', 'data'], action.data);
    case UPDATE_STATUS_SUCCESS:
      return state
        .setIn(['updateStatus', 'loading'], false)
        .setIn(['updateStatus', 'data'], false)
        .setIn(['updateStatus', 'success'], true);
    case UPDATE_STATUS_ERROR:
      return state
        .setIn(['updateStatus', 'loading'], false)
        .setIn(['updateStatus', 'data'], false)
        .setIn(['updateStatus', 'error'], action.error);
    default:
      return state;
  }
}
export default alertsNotifReducer;
