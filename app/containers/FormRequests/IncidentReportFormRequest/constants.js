/*
 * App Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

//  Incident Form Request Constants
export const CREATE_IRFREQUESTS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/CREATE_IRFREQUESTS';

export const IRF_REFERRENCES = 'hcmwebapp/FormRequests/IncidentReportFormRequest/IRF_REFERRENCES';
export const SUCCESS_IRFREFERRENCES = 'hcmwebapp/FormRequests/IncidentReportFormRequest/SUCCESS_IRFREFERRENCES';

export const SEARCH_QUERY = 'hcmwebapp/FormRequests/IncidentReportFormRequest/SEARCH_QUERY';
export const SEARCH_ERROR = 'hcmwebapp/FormRequests/IncidentReportFormRequest/SEARCH_ERROR';

export const EMPLOYEE_LISTS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/EMPLOYEE_LISTS';
export const EMPLOYEE_SUCCESS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/EMPLOYEE_SUCCESS';
export const EMPLOYEE_ERROR = 'hcmwebapp/FormRequests/IncidentReportFormRequest/EMPLOYEE_ERROR';

export const SUCCESS_IRFFORMS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/SUCCESS_IRFFORMS';
export const ERROR_IRFFORMS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/ERROR_IRFFORMS';
export const DISMISS_IRFFORMS = 'hcmwebapp/FormRequests/IncidentReportFormRequest/DISMISS_IRFFORMS';
