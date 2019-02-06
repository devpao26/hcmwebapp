/*
 * OnBoarding Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LIST_PPE = 'hcmwebapp/HRPages/PPERequirements/LIST_PPE';
export const API_FAILED = 'hcmwebapp/HRPages/PPERequirements/API_FAILED';
export const API_SUCCESS = 'hcmwebapp/HRPages/PPERequirements/API_SUCCESS';

// PPE Requirement List
export const GET_PPEREQ = 'hcmwebapp/HRPages/PPERequirements/GET_PPEREQ';
export const GET_PPEREQSUCCESS = 'hcmwebapp/HRPages/PPERequirements/GET_PPEREQSUCCESS';
export const GET_PPEREQERROR = 'hcmwebapp/HRPages/PPERequirements/GET_PPEREQERROR';

// PPE Requirement Update IsRequired
export const UPDATE_ISREQ = 'hcmwebapp/HRPages/PPERequirements/UPDATE_ISREQ';

// PPE Upload Files
export const UPLOAD_FILES = 'hcmwebapp/HRPages/PPERequirements/UPLOAD_FILES';
export const UPLOAD_FILESSUCCESS = 'hcmwebapp/HRPages/PPERequirements/UPLOAD_FILESSUCCESS';
export const UPLOAD_FILESERROR = 'hcmwebapp/HRPages/PPERequirements/UPLOAD_FILESERROR';
export const DELETE_FILE = 'hcmwebapp/HRPages/PPERequirements/DELETE_FILE';

// PPE Update Requirement Uploaded File Status
export const UPDATE_REQSTATUS = 'hcmwebapp/HRPages/PPERequirements/UPDATE_REQSTATUS';

// Migrate Applicant to Employee
export const APPL_EMP = 'hcmwebapp/HRPages/PPERequirements/APPL_EMP';
export const MIGRATE_SUCCESS = 'hcmwebapp/HRPages/PPERequirements/MIGRATE_SUCCESS';

// Search and Filter
export const SEARCH_FILTER = 'hcmwebapp/HRPages/PPERequirements/SEARCH_FILTER';

// PreEmpReqStatus IDs
export const PREEMPSTATUS_FORAPPROVAL = 'c7280e22-787d-48a8-aeb0-926945e92afd';
export const PREEMPSTATUS_APPROVED = '256d3b52-9813-4143-8331-63948557ae4b';
export const PREEMPSTATUS_PENDING = '8a85a7de-80a6-4635-afe2-88c887bff280';
export const PREEMPSTATUS_DISAPPROVED = '3718dce8-59c6-4737-994f-e9e59e20b01b';
