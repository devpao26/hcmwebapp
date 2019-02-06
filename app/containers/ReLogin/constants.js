/*
 * ReLogin Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const RESET_RELOGINSTATE = 'hcmwebapp/ReLogin/RESET_RELOGINSTATE';
export const TOGGLE_MODAL = 'hcmwebapp/ReLogin/TOGGLE_MODAL';

export const SUBMIT_RELOGIN = 'hcmwebapp/ReLogin/SUBMIT_RELOGIN';
export const SUBMIT_RELOGIN_SUCCESS = 'hcmwebapp/ReLogin/SUBMIT_RELOGIN_SUCCESS';
export const SUBMIT_RELOGIN_ERROR = 'hcmwebapp/ReLogin/SUBMIT_RELOGIN_ERROR';
export const SUBMIT_RELOGIN_RESET = 'hcmwebapp/ReLogin/SUBMIT_RELOGIN_RESET';
