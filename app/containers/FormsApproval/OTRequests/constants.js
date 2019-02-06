/*
 * OT Requests Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_OTLISTS = 'hcmwebapp/FormsApproval/OTRequest/GET_OTLISTS';
export const GET_OTLISTSSUCCESS = 'hcmwebapp/FormsApproval/OTRequest/GET_OTLISTSSUCCESS';
export const GET_OTLISTSERROR = 'hcmwebapp/FormsApproval/OTRequest/GET_OTLISTSERROR';

export const UPDATE_REQUEST = 'hcmwebapp/FormsApproval/OTRequest/UPDATE_REQUEST';
export const UPDATE_REQUESTSUCCESS = 'hcmwebapp/FormsApproval/OTRequest/UPDATE_REQUESTSUCCESS';
export const UPDATE_REQUESTERROR = 'hcmwebapp/FormsApproval/OTRequest/UPDATE_REQUESTERROR';
export const CLEAR_UPDATEREQUEST = 'hcmwebapp/FormsApproval/OTRequest/CLEAR_UPDATEREQUEST';

export const RESET_STATE = 'hcmwebapp/FormsApproval/OTRequest/RESET_STATE';
