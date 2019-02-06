/*
 * Form Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// Forms Request
export const CREATE_FORMS = 'hcmwebapp/FormRequests/DTR/CREATE_FORMS';

export const RETRIEVE_FORMS = 'hcmwebapp/FormRequests/DTR/RETRIEVE_FORMS';
export const RETRIEVE_FORMSUCCESS = 'hcmwebapp/FormRequests/DTR/RETRIEVE_FORMSUCCESS';

export const SUCCESS_FORMS = 'hcmwebapp/FormRequests/DTR/SUCCESS_FORMS';
export const ERROR_FORMS = 'hcmwebapp/FormRequests/DTR/ERROR_FORMS';
export const DISMISS_FORMS = 'hcmwebapp/FormRequests/DTR/DISMISS_FORMS';

export const RESET_STATE = 'hcmwebapp/FormRequests/DTR/RESET_STATE';
