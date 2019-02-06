/*
 * Home Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const GET_DATA = 'hcmwebapp/Home/GET_DATA';

// Data Refs
export const DATA_REFS = 'hcmwebapp/Home/DATA_REFS';
export const DATA_REFSSUCCESS = 'hcmwebapp/Home/DATA_REFSSUCCESS';
export const DATA_REFSERROR = 'hcmwebapp/Home/DATA_REFSERROR';
export const DATA_FORMREQSUCCESS = 'hcmwebapp/Home/DATA_FORMREQSUCCESS';
export const DATA_APPLFORMSUCCESS = 'hcmwebapp/Home/DATA_APPLFORMSUCCESS';
export const DATA_ONSPOTEARNSUCCESS = 'hcmwebapp/Home/DATA_ONSPOTEARNSUCCESS';
export const DATA_ONSPOTDEDUCTSUCCESS = 'hcmwebapp/Home/DATA_ONSPOTDEDUCTSUCCESS';
export const DATA_TIMEDEARNSUCCESS = 'hcmwebapp/Home/DATA_TIMEDEARNSUCCESS';
export const DATA_TIMEDDEDUCTSUCCESS = 'hcmwebapp/Home/DATA_TIMEDDEDUCTSUCCESS';
export const DATA_CUSTOMFORMSEARNSUCCESS = 'hcmwebapp/Home/DATA_CUSTOMFORMSEARNSUCCESS';

export const EMP_SHIFTSUMMARYSUCCESS = 'hcmwebapp/Home/EMP_SHIFTSUMMARYSUCCESS';
export const EMP_SHIFTSUMMARYERROR = 'hcmwebapp/Home/EMP_SHIFTSUMMARYERROR';

export const EMP_LEAVEHISTORYSUCCESS = 'hcmwebapp/Home/EMP_LEAVEHISTORYSUCCESS';
export const EMP_LEAVEHISTORYERROR = 'hcmwebapp/Home/EMP_LEAVEHISTORYERROR';
