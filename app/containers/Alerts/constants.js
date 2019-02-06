/*
 * Alerts and Notifications Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const RESET_STATE = 'hcmwebapp/AlertsNotif/RESET_STATE';

// Show/Hide Alert Modal
export const TOGGLE_ALERTMODAL = 'hcmwebapp/AlertsNotif/TOGGLE_ALERTMODAL';

//  Alerts and Listings Constants
export const GET_ALERTS = 'hcmwebapp/AlertsNotif/GET_ALERTS';
export const GET_ALERTS_SUCCESS = 'hcmwebapp/AlertsNotif/GET_ALERTS_SUCCESS';
export const GET_ALERTS_ERROR = 'hcmwebapp/AlertsNotif/GET_ALERTS_ERROR';

// Mark as read
export const MARK_READ = 'hcmwebapp/AlertsNotif/MARK_READ';
export const MARK_READ_SUCCESS = 'hcmwebapp/AlertsNotif/MARK_READ_SUCCESS';
export const MARK_READ_ERROR = 'hcmwebapp/AlertsNotif/MARK_READ_ERROR';

// Approve or Reject
export const UPDATE_STATUS = 'hcmwebapp/AlertsNotif/UPDATA_STATUS';
export const UPDATE_STATUS_SUCCESS = 'hcmwebapp/AlertsNotif/UPDATA_STATUS_SUCCESS';
export const UPDATE_STATUS_ERROR = 'hcmwebapp/AlertsNotif/UPDATA_STATUS_ERROR';
