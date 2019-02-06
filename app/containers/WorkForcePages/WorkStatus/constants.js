/*
 * Workstatus Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CLEAR_STATEDATA = 'hcmwebapp/WorkFrocePages/Shift/CLEAR_STATEDATA';

export const GET_TEMPLATES = 'hcmwebapp/WorkForcePages/WorkStatus/GET_TEMPLATES';
export const GET_TEMPLATESSUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/GET_TEMPLATESSUCCESS';
export const GET_TEMPLATESERROR = 'hcmwebapp/WorkForcePages/WorkStatus/GET_TEMPLATESERROR';
export const SEARCH_TEMPLATES = 'hcmwebapp/WorkForcePages/WorkStatus/SEARCH_TEMPLATES';
export const SORT_TEMPLATES = 'hcmwebapp/WorkForcePages/WorkStatus/SORT_TEMPLATES';

export const GET_WORKFORMLOAD = 'hcmwebapp/WorkForcePages/WorkStatus/GET_WORKFORMLOAD';
export const GET_WORKFORMLOADSUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/GET_WORKFORMLOADSUCCESS';
export const GET_WORKFORMLOADERROR = 'hcmwebapp/WorkForcePages/WorkStatus/GET_WORKFORMLOADERROR';

export const GET_ENROLLED = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ENROLLED';
export const GET_ENROLLEDSUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ENROLLEDSUCCESS';
export const GET_ENROLLEDERROR = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ENROLLEDERROR';
export const GOTO_PAGEENROLLED = 'hcmwebapp/WorkForcePages/WorkStatus/GOTO_PAGEENROLLED';
export const SEARCH_ENROLLED = 'hcmwebapp/WorkForcePages/WorkStatus/SEARCH_ENROLLED';

export const SAVE_WORKSTATTEMPLATE = 'hcmwebapp/WorkForcePages/WorkStatus/SAVE_WORKSTATTEMPLATE';
export const SAVE_WORKSTATTEMPLATESUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/SAVE_WORKSTATTEMPLATESUCCESS';
export const SAVE_WORKSTATTEMPLATEERROR = 'hcmwebapp/WorkForcePages/WorkStatus/SAVE_WORKSTATTEMPLATEERROR';
export const CLEAR_WORKSTATTEMPLATEDATA = 'hcmwebapp/WorkForcePages/WorkStatus/CLEAR_WORKSTATTEMPLATEDATA';

export const DELETE_TEMPLATE = 'hcmwebapp/WorkForcePages/WorkStatus/DELETE_WORKSTATTEMPLATE';
export const DELETE_TEMPLATESUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/DELETE_WORKSTATTEMPLATESUCCESS';
export const DELETE_TEMPLATEERROR = 'hcmwebapp/WorkForcePages/WorkStatus/DELETE_WORKSTATTEMPLATEERROR';
export const CLEAR_DELETE = 'hcmwebapp/WorkForcePages/WorkStatus/CLEAR_DELETE';

export const GET_ADDTOLIST = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ADDTOLIST';
export const GET_ADDTOLISTSUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ADDTOLISTSUCCESS';
export const GET_ADDTOLISTERROR = 'hcmwebapp/WorkForcePages/WorkStatus/GET_ADDTOLISTERROR';
export const SEARCH_ADDTOLIST = 'hcmwebapp/WorkForcePages/WorkStatus/SEARCH_ADDTOLIST';

export const ADD_TOTEMPLATE = 'hcmwebapp/WorkForcePages/WorkStatus/ADD_TOTEMPLATE';
export const ADD_TOTEMPLATESUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/ADD_TOTEMPLATESUCCESS';
export const ADD_TOTEMPLATEERROR = 'hcmwebapp/WorkForcePages/WorkStatus/ADD_TOTEMPLATEERROR';
export const CLEAR_ADDTOTEMPLATE = 'hcmwebapp/WorkForcePages/WorkStatus/CLEAR_ADDTOTEMPLATE';

export const UNASSIGN_TEMPLATE = 'hcmwebapp/WorkForcePages/WorkStatus/UNASSIGN_TEMPLATE';
export const UNASSIGN_TEMPLATESUCCESS = 'hcmwebapp/WorkForcePages/WorkStatus/UNASSIGN_TEMPLATESUCCESS';
export const UNASSIGN_TEMPLATEERROR = 'hcmwebapp/WorkForcePages/WorkStatus/UNASSIGN_TEMPLATEERROR';
export const CLEAR_UNASSIGN = 'hcmwebapp/WorkForcePages/WorkStatus/CLEAR_UNASSIGN';
