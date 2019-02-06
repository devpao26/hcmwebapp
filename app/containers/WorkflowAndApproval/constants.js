/*
 * Work Flow Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const WFLOW_RESETSTATE = 'hcmwebapp/WorkflowAndApproval/WFLOW_RESETSTATE';

 // Work flow Processes List
export const WFLOW_PROCSLIST_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCSLIST_SUCCESS';
export const WFLOW_PROCSLIST_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCSLIST_FAILED';
export const WFLOW_PROCSLIST = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCSLIST';
export const WFLOW_PROCS_SELECTEDITEM = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCS_SELECTEDITEM';

// Work flow Templates List
export const WFLOW_TEMPLATELIST_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATELIST_SUCCESS';
export const WFLOW_TEMPLATELIST_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATELIST_FAILED';
export const WFLOW_TEMPLATELIST = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATELIST';
export const WFLOW_TEMPLATE_SELECTEDITEM = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATE_SELECTEDITEM';

export const WFLOW_TEMPLATE_STEP = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATE_STEP';
// export const WFLOW_TEMPLATE_STEP_SELECTEDITEM = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATE_STEP_SELECTEDITEM';
export const WFLOW_TEMPLATE_STEP_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATE_STEP_SUCCESS';
export const WFLOW_TEMPLATE_STEP_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_TEMPLATE_STEP_FAILED';

export const WFLOW_PROCESSTEMPLATE_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCESSTEMPLATE_SUCCESS';
export const WFLOW_PROCESSTEMPLATE_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCESSTEMPLATE_FAILED';
export const WFLOW_PROCESSTEMPLATE = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCESSTEMPLATE';
export const WFLOW_PROCESSRESET = 'hcmwebapp/WorkflowAndApproval/WFLOW_PROCESSRESET';

// Employee, WorkGroup and Department List
export const WFLOW_EMPWGDP_LIST = 'hcmwebapp/WorkflowAndApproval/WFLOW_EMPWGDP_LIST';
export const WFLOW_EMPWGDP_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_EMPWGDP_SUCCESS';
export const WFLOW_EMPWGDP_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_EMPWGDP_FAILED';
export const WFLOW_EMPWGDP_SELECTEDITEMS = 'hcmwebapp/WorkflowAndApproval/WFLOW_EMPWGDP_SELECTEDITEMS';

// Assign to Entity
export const WFLOW_ENTITY = 'hcmwebapp/WorkflowAndApproval/WFLOW_ENTITY';
export const WFLOW_ENT_SUCCESS = 'hcmwebapp/WorkflowAndApproval/WFLOW_ENT_SUCCESS';
export const WFLOW_ENT_FAILED = 'hcmwebapp/WorkflowAndApproval/WFLOW_ENT_FAILED';
export const WFLOW_ENT_SELECTEDITEM = 'hcmwebapp/WorkflowAndApproval/WFLOW_ENT_SELECTEDITEM';
