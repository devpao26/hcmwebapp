/*
 * IT ADMIN Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CLEAR_STATE = 'hcmwebapp/ITPages/MasterList/CLEAR_STATE';

// Retrieve Employee List
export const GET_EMPLIST = 'hcmwebapp/ITPages/MasterList/GET_EMPLIST';
export const GET_EMPLIST_SUCCESS = 'hcmwebapp/ITPages/MasterList/GET_EMPLIST_SUCCESS';
export const GET_EMPLIST_ERROR = 'hcmwebapp/ITPages/MasterList/GET_EMPLIST_ERROR';
export const GET_EMPLIST_SEARCH = 'hcmwebapp/ITPages/MasterList/GET_EMPLIST_SEARCH';

// Retrieve References
export const GET_REFS = 'hcmwebapp/ITPages/MasterList/GET_REFS';
export const GET_REFS_SUCCESS = 'hcmwebapp/ITPages/MasterList/GET_REFS_SUCCESS';
export const GET_REFS_ERROR = 'hcmwebapp/ITPages/MasterList/GET_REFS_ERROR';

// Create/Change Employee Status
export const CHANGE_STATUS = 'hcmwebapp/ITPages/MasterList/CHANGE_STATUS';
export const CHANGE_STATUS_SUCCESS = 'hcmwebapp/ITPages/MasterList/CHANGE_STATUS_SUCCESS';
export const CHANGE_STATUS_ERROR = 'hcmwebapp/ITPages/MasterList/CHANGE_STATUS_ERROR';
export const CHANGE_STATUS_RESET = 'hcmwebapp/ITPages/MasterList/CHANGE_STATUS_RESET';

// Send New Password
export const SEND_NEWPASS = 'hcmwebapp/ITPages/MasterList/SEND_NEWPASS';
export const SEND_NEWPASS_SUCCESS = 'hcmwebapp/ITPages/MasterList/SEND_NEWPASS_SUCCESS';
export const SEND_NEWPASS_ERROR = 'hcmwebapp/ITPages/MasterList/SEND_NEWPASS_ERROR';
export const SEND_NEWPASS_RESET = 'hcmwebapp/ITPages/MasterList/SEND_NEWPASS_RESET';

// Update email
export const UPDATE_EMPEMAIL = 'hcmwebapp/ITPages/MasterList/UPDATE_EMPEMAIL';
export const UPDATE_EMPEMAIL_SUCCESS = 'hcmwebapp/ITPages/MasterList/UPDATE_EMPEMAIL_SUCCESS';
export const UPDATE_EMPEMAIL_ERROR = 'hcmwebapp/ITPages/MasterList/UPDATE_EMPEMAIL_ERROR';
export const UPDATE_EMPEMAIL_RESET = 'hcmwebapp/ITPages/MasterList/UPDATE_EMPEMAIL_RESET';
