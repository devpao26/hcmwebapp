/*
 * Compenben Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_BENEFITTYPES = 'hcmwebapp/HRPages/CompenBen/GET_BENEFITTYPES';
export const GET_BENEFITTYPESSUCCESS = 'hcmwebapp/HRPages/CompenBen/GET_BENEFITTYPESSUCCESS';
export const GET_BENEFITTYPESERROR = 'hcmwebapp/HRPages/CompenBen/GET_BENEFITTYPESERROR';

export const GET_TEMPLATES = 'hcmwebapp/HRPages/CompenBen/GET_TEMPLATES';
export const GET_TEMPLATESSUCCESS = 'hcmwebapp/HRPages/CompenBen/GET_TEMPLATESSUCCESS';
export const GET_TEMPLATESERROR = 'hcmwebapp/HRPages/CompenBen/GET_TEMPLATESERROR';

export const GET_ENROLLEDEMP = 'hcmwebapp/HRPages/CompenBen/GET_ENROLLEDEMP';
export const GET_ENROLLEDEMPRESET = 'hcmwebapp/HRPages/CompenBen/GET_ENROLLEDEMPRESET';
export const GET_ENROLLEDEMPSUCCESS = 'hcmwebapp/HRPages/CompenBen/GET_ENROLLEDEMPSUCCESS';
export const GET_ENROLLEDEMPERROR = 'hcmwebapp/HRPages/CompenBen/GET_ENROLLEDEMPERROR';

export const GET_EMPLIST = 'hcmwebapp/HRPages/CompenBen/GET_EMPLIST';
export const GET_EMPLISTSUCCESS = 'hcmwebapp/HRPages/CompenBen/GET_EMPLISTSUCCESS';
export const GET_EMPLISTERROR = 'hcmwebapp/HRPages/CompenBen/GET_EMPLISTERROR';
export const CLEAR_EMPLIST = 'hcmwebapp/HRPages/CompenBen/CLEAR_EMPLIST';

export const ADD_TOTEMPLATE = 'hcmwebapp/HRPages/CompenBen/ADD_TOTEMPLATE';
export const ADD_TOTEMPLATESUCCESS = 'hcmwebapp/HRPages/CompenBen/ADD_TOTEMPLATESUCCESS';
export const ADD_TOTEMPLATEERROR = 'hcmwebapp/HRPages/CompenBen/ADD_TOTEMPLATEERROR';
export const CLEAR_ADDTO = 'hcmwebapp/HRPages/CompenBen/CLEAR_ADDTO';

export const EMP_UNASSIGN = 'hcmwebapp/HRPages/CompenBen/EMP_UNASSIGN';
export const EMP_UNASSIGNSUCCESS = 'hcmwebapp/HRPages/CompenBen/EMP_UNASSIGNSUCCESS';
export const EMP_UNASSIGNERROR = 'hcmwebapp/HRPages/CompenBen/EMP_UNASSIGNERROR';
export const CLEAR_UNASSIGN = 'hcmwebapp/HRPages/CompenBen/CLEAR_UNASSIGN';

export const CREATE_NEWTEMP = 'hcmwebapp/HRPages/CompenBen/CREATE_NEWTEMP';
export const CREATE_NEWTEMPSUCCESS = 'hcmwebapp/HRPages/CompenBen/CREATE_NEWTEMPSUCCESS';
export const CREATE_NEWTEMPERROR = 'hcmwebapp/HRPages/CompenBen/CREATE_NEWTEMPERROR';

export const DELETE_TEMPLATE = 'hcmwebapp/HRPages/CompenBen/DELETE_TEMPLATE';
export const DELETE_TEMPLATESUCCESS = 'hcmwebapp/HRPages/CompenBen/DELETE_TEMPLATESUCCESS';
export const DELETE_TEMPLATEERROR = 'hcmwebapp/HRPages/CompenBen/DELETE_TEMPLATEERROR';
