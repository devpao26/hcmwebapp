/*
 * WorkForce Desktop Configurations Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const ToggleFilter = {
  BGMODE: 'BGMODE',
  SSHOT: 'SSHOT',
  DESKCAPTURE: 'DESKCAPTURE',
  BROWSERCAPTURE: 'BROWSERCAPTURE',
  ACTIVEBROWSER: 'ACTIVEBROWSER',
  APPMONITOR: 'APPMONITOR',
  KBMOUSEMONITOR: 'KBMOUSEMONITOR',
};

export const RESET_STATE = 'hcmwebapp/WorkForcePages/DesktopConfig/RESET_STATE';

export const Templates = Object.freeze({
  RETRIEVE: 'hcmwebapp/WorkForcePages/DesktopConfig/TEMPLATES_RETRIEVE',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/TEMPLATES_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/TEMPLATES_ERROR',
  PAGING: 'hcmwebapp/WorkForcePages/DesktopConfig/TEMPLATES_PAGING',
});

export const Enrolled = Object.freeze({
  RETRIEVE: 'hcmwebapp/WorkForcePages/DesktopConfig/ENROLLED_RETRIEVE',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/ENROLLED_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/ENROLLED_ERROR',
  PAGING: 'hcmwebapp/WorkForcePages/DesktopConfig/ENROLLED_PAGING',
});

export const AddToList = Object.freeze({
  RETRIEVE: 'hcmwebapp/WorkForcePages/DesktopConfig/ADDTO_RETRIEVE',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/ADDTO_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/ADDTO_ERROR',
  PAGING: 'hcmwebapp/WorkForcePages/DesktopConfig/ADDTO_PAGING',
});

export const Assign = Object.freeze({
  SUBMIT: 'hcmwebapp/WorkForcePages/DesktopConfig/ASSIGN_SUBMIT',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/ASSIGN_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/ASSIGN_ERROR',
  RESET: 'hcmwebapp/WorkForcePages/DesktopConfig/ASSIGN_RESET',
});

export const Unassign = Object.freeze({
  SUBMIT: 'hcmwebapp/WorkForcePages/DesktopConfig/UNASSIGN_SUBMIT',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/UNASSIGN_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/UNASSIGN_ERROR',
  RESET: 'hcmwebapp/WorkForcePages/DesktopConfig/UNASSIGN_RESET',
});

export const Update = Object.freeze({
  SUBMIT: 'hcmwebapp/WorkForcePages/DesktopConfig/UPDATE_SUBMIT',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/UPDATE_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/UPDATE_ERROR',
  RESET: 'hcmwebapp/WorkForcePages/DesktopConfig/UPDATE_RESET',
});

export const Save = Object.freeze({
  SUBMIT: 'hcmwebapp/WorkForcePages/DesktopConfig/SAVE_SUBMIT',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/SAVE_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/SAVE_ERROR',
  RESET: 'hcmwebapp/WorkForcePages/DesktopConfig/SAVE_RESET',
});

export const Delete = Object.freeze({
  SUBMIT: 'hcmwebapp/WorkForcePages/DesktopConfig/DELETE_SUBMIT',
  SUCCESS: 'hcmwebapp/WorkForcePages/DesktopConfig/DELETE_SUCCESS',
  ERROR: 'hcmwebapp/WorkForcePages/DesktopConfig/DELETE_ERROR',
  RESET: 'hcmwebapp/WorkForcePages/DesktopConfig/DELETE_RESET',
});
