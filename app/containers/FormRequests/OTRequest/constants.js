/*
 * OT Form Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

//  OT Forms Request
export const CREATE_OTFORMS = 'hcmwebapp/FormRequests/OTRequest/CREATE_OTFORMS';

export const RETRIEVE_OTFORMS = 'hcmwebapp/FormRequests/OTRequest/RETRIEVE_OTFORMS';
export const RETRIEVE_OTFORMSUCCESS = 'hcmwebapp/FormRequests/OTRequest/RETRIEVE_OTFORMSUCCESS';

export const SUCCESS_OTFORMS = 'hcmwebapp/FormRequests/OTRequest/SUCCESS_OTFORMS';
export const ERROR_OTFORMS = 'hcmwebapp/FormRequests/OTRequest/ERROR_OTFORMS';
export const DISMISS_OTFORMS = 'hcmwebapp/FormRequests/OTRequest/DISMISS_OTFORMS';

export const RESET_STATE = 'hcmwebapp/FormRequests/OTRequest/RESET_STATE';
