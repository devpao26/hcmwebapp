/*
 * Appp Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CREATE_FORM = 'hcmwebapp/FormRequests/HRF/CREATE_FORM';
export const CREATE_FORM_SUCCESS = 'hcmwebapp/FormRequests/HRF/CREATE_FORM_SUCCESS';
export const CREATE_FORM_ERROR = 'hcmwebapp/FormRequests/HRF/CREATE_FORM_ERROR';
export const CREATE_FORM_RESET = 'hcmwebapp/FormRequests/HRF/CREATE_FORM_RESET';
