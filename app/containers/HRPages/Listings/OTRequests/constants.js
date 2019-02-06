/*
 * Forms Approval Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const RequestList = {
  RETRIEVE: 'hcmwebapp/HRAdmin/OTRequests/REQUESTLIST_RETRIEVE',
  SUCCESS: 'hcmwebapp/HRAdmin/OTRequests/REQUESTLIST_SUCCESS',
  ERROR: 'hcmwebapp/HRAdmin/OTRequests/REQUESTLIST_ERROR',
  PAGING: 'hcmwebapp/HRAdmin/OTRequests/REQUESTLIST_PAGING',
};

export const RESET_STATE = 'hcmwebapp/HRAdmin/OTRequests/RESET_STATE';
