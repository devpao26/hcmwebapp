/*
 * Employee Floor Status List Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CLEAR_STATE = 'hcmwebapp/WorkForcePages/FloorStatusList/CLEAR_STATE';

export const EMP_LIST = 'hcmwebapp/WorkForcePages/FloorStatusList/EMP_LIST';
export const EMP_SUCCESS = 'hcmwebapp/WorkForcePages/FloorStatusList/EMP_SUCCESS';
export const EMP_FAILED = 'hcmwebapp/WorkForcePages/FloorStatusList/EMP_FAILED';
export const EMP_SETID = 'hcmwebapp/WorkForcePages/FloorStatusList/EMP_SETID';
export const SEARCH_FILTER = 'hcmwebapp/WorkForcePages/FloorStatusList/SEARCH_FILTER';

export const GET_TEAMS = 'hcmwebapp/WorkForcePages/FloorStatusList/GET_TEAMS';
export const GET_TEAMSSUCCESS = 'hcmwebapp/WorkForcePages/FloorStatusList/GET_TEAMSSUCCESS';
export const GET_TEAMSERROR = 'hcmwebapp/WorkForcePages/FloorStatusList/GET_TEAMSERROR';

export const REQUEST_DTR = 'hcmwebapp/WorkForcePages/FloorStatusList/REQUEST_DTR';
export const REQUEST_DTRSUCCESS = 'hcmwebapp/WorkForcePages/FloorStatusList/REQUEST_DTRSUCCESS';
export const REQUEST_DTRERROR = 'hcmwebapp/WorkForcePages/FloorStatusList/REQUEST_DTRERROR';
export const CLEAR_URI = 'hcmwebapp/WorkForcePages/FloorStatusList/CLEAR_URI';
