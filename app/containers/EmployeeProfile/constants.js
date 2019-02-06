/*
 *
 * EmployeeProfile constants
 *
 */
// Enum references for the Admin access
export const AdminTypes = {
  HR: 'HR',
  WF: 'WF',
  IT: 'IT',
  FIN: 'FIN',
};

// Reset State on Unmount
export const RESET_STATE = 'hcmwebapp/EmployeeProfile/RESET_STATE';

export const EmpProfile = {
  RETRIEVE: 'hcmwebapp/EmployeeProfile/EMPPROFILE_RETRIEVE',
  SUCCESS: 'hcmwebapp/EmployeeProfile/EMPPROFILE_SUCCESS',
  ERROR: 'hcmwebapp/EmployeeProfile/EMPPROFILE_ERROR',
};

export const UpdateLeave = {
  SUBMIT: 'hcmwebapp/EmployeeProfile/UPDATELEAVE_SUBMIT',
  SUCCESS: 'hcmwebapp/EmployeeProfile/UPDATELEAVE_SUCCESS',
  ERROR: 'hcmwebapp/EmployeeProfile/UPDATELEAVE_ERROR',
  RESET: 'hcmwebapp/EmployeeProfile/UPDATELEAVE_RESET',
};

export const UpdateProfile = {
  SUBMIT: 'hcmwebapp/EmployeeProfile/UPDATEPROF_SUBMIT',
  SUCCESS: 'hcmwebapp/EmployeeProfile/UPDATEPROF_SUCCESS',
  ERROR: 'hcmwebapp/EmployeeProfile/UPDATEPROF_ERROR',
  RESET: 'hcmwebapp/EmployeeProfile/UPDATEPROF_RESET',
};

export const EmpReqs = {
  RETRIEVE: 'hcmwebapp/EmployeeProfile/EMPREQS_RETRIEVE',
  SUCCESS: 'hcmwebapp/EmployeeProfile/EMPREQS_SUCCESS',
  ERROR: 'hcmwebapp/EmployeeProfile/EMPREQS_ERROR',
  PAGING: 'hcmwebapp/EmployeeProfile/EMPREQS_PAGING',
};

export const LOAD_COMPS = 'hcmwebapp/EmployeeProfile/LOAD_COMPS';
