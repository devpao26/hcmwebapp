/**
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const SESSION_EXPIRED = 'hcmwebapp/App/SESSION_EXPIRED';
export const SERVER_ERROR = 'hcmwebapp/App/SERVER_ERROR';
export const USER_LOGOUT = 'hcmwebapp/App/USER_LOGOUT';
export const USER_LOGOUT_RESET = 'hcmwebapp/App/USER_LOGOUT_RESET';
export const CHANGE_ALERTCOUNT = 'hcmwebapp/App/CHANGE_ALERTCOUNT';
export const CHANGE_NOTIFCOUNT = 'hcmwebapp/App/CHANGE_NOTIFCOUNT';

export const EMP_LOGIN = 'hcmwebapp/App/EMP_LOGIN';
export const API_FAILED = 'hcmwebapp/App/API_FAILED';
export const API_SUCCESS = 'hcmwebapp/App/API_SUCCESS';

/**
 * Each Const is intended for the use of URL link
 * API Services sub links
 */
let BASE_URL = 'http://hcmapistaging.azurewebsites.net/';
// if (window.location.hostname === 'vkpowfprwebapp-hris.azurewebsites.net') {
//   BASE_URL = 'http://vkpohcmapiprod.azurewebsites.net/';
// }
// const BASE_URL = process.env.API_URL;
// export const BASE_URL = 'http://vkpohcmapiprod.azurewebsites.net/';
export const UPLOADFILE_BASE = 'http://hcmuploader.azurewebsites.net/api/';
export const API_EMPLOGIN = `${BASE_URL}Services/Authentication.svc/Login`;
export const API_UPLOADFILE = `${UPLOADFILE_BASE}uploadfiles/SaveFile`;

/**
 * References APIs
 */
export const API_FORMREFS = `${BASE_URL}Services/Recruitment/JobPortal.svc/JobFormLoad`;
export const API_JOBFORMREFS = `${BASE_URL}Services/Recruitment/JobPortal.svc/JobList`;
export const API_APPLFORMREFS = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/ApplicantFormRefs`;
export const API_SHIFTFORMLOAD = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftFormLoad`;
export const API_WORKFLOWFORMLOAD = `${BASE_URL}Services/Employee/WorkFlow.svc/WorkFlowFormLoad`;
export const API_WORKFLOWFORMLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/WorkFlowFormList`;
export const API_ONSPOTEARNTYPES = `${BASE_URL}Services/Finance/AdminPanel.svc/OnSpotEarnTypeList`;
export const API_ONSPOTDEDUCTTYPES = `${BASE_URL}Services/Finance/AdminPanel.svc/OnSpotDeductTypeList`;
export const API_TIMEDEARNTYPES = `${BASE_URL}Services/Finance/AdminPanel.svc/TimedEarnTypeList`;
export const API_TIMEDDEDUCTTYPES = `${BASE_URL}Services/Finance/AdminPanel.svc/TimedDeductTypeList`;

/**
 * HR Admin APIs
 */
export const API_JOSIGNED = `${BASE_URL}Services/Recruitment/JobPortal.svc/SignedJOList`;
export const API_JOSTATCHANGE = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/ProfileJOStatus/`;
export const API_PPEREQ = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/PreEmpReqs/`;
export const API_REQUPDATE = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/PreEmpReq/`;
export const API_UPLOADREQATTACHS = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/UploadApplReqAttachs/`;
export const API_APPLTOEMP = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/MigrateApplToEmp/`;
export const API_DELETEFILE = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/ReqAttachs/`;
export const API_DELETEJOFILE = `${BASE_URL}Services/Recruitment/ApplicantUserAccount.svc/JOAttachs/`;

/**
 * IT Admin APIs
 */
export const API_ASSETSLISTS = `${BASE_URL}Services/Employee/WorkForce.svc/AssetList`;
/**
 * Compensation and Benefit APIs
 */
export const API_COMPBENTEMPLATE = `${BASE_URL}Services/Finance/Forms.svc/CompBenTemplate`;
export const API_COMPBENTEMPLATELIST = `${BASE_URL}Services/Finance/Forms.svc/CompBenTemplateList`;
export const API_COMPBENFOREMP = `${BASE_URL}Services/Finance/Forms.svc/CompBenTemplateForEmployee/`;
export const API_COMPBENBENEFITTYPE = `${BASE_URL}Services/Finance/AdminPanel.svc/CompBenefitTypeList`;

/**
 * Employee APIs
 */
export const API_EMPLISTS = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpList`; // NOTE: add ?id={EMPID} param to retrieve a single employee profile
export const API_EMPPASSWORD = `${BASE_URL}Services/Authentication.svc/EmpPassword`;
export const API_EMPPROFILE = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpProfile/`;
export const API_EMPACCESSFORM = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpUserAccount/`;
export const API_EMPFORMREFS = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpFormRefs`;
export const API_EMPSENDNEWPASSWORD = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpUserAccount/Password/`;
export const API_EMPPPEREQS = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpPPEReqs`; // NOTE: add ?id={EMPID} param to retrieve employee ppe requirements
/**
 * WorkForce APIs
 */
export const API_SHIFTREC = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftRecordList`;
export const API_URLAPPLIST = `${BASE_URL}Services/Employee/WorkForce.svc/EmpUrlAppList`;
export const API_SCREENSHOT = `${BASE_URL}Services/Employee/WorkForce.svc/ScreenShotList`;
export const API_WORKFORCEACCESS = `${BASE_URL}Services/Employee/WorkForce.svc/WorkForceAccess`;

/**
 * Finance Admin APIs
 */
export const API_PR_EMPDTR_INFO = `${BASE_URL}Services/Employee/WorkForce.svc/DTRList`;
export const API_PR_PAYROLLDATES = `${BASE_URL}Services/Finance/Payroll.svc/PayrollDates`;
export const API_PR_PAYROLLREVIEW = `${BASE_URL}Services/Finance/Payroll.svc/PayrollReview`;
export const API_PR_PAYSLIP = `${BASE_URL}Services/Reports.svc/Reports/Payslip?allrecords=true&`;
export const API_PR_ONSPOTDEDUCT = `${BASE_URL}Services/Finance/Payroll.svc/EmpOnSpotDeduct`;
export const API_PR_EMPONSPOTDEDUCT = `${BASE_URL}Services/Finance/Payroll.svc/EmpOnSpotDeduct`;
export const API_PR_EMPONSPOTEARN = `${BASE_URL}Services/Finance/Payroll.svc/EmpOnSpotEarn`;
export const API_PR_EMPTIMEDDEDUCT = `${BASE_URL}Services/Finance/Payroll.svc/EmpTimedDeduct`;
export const API_PR_EMPTIMEDEARN = `${BASE_URL}Services/Finance/Payroll.svc/EmpTimedEarn`;

/**
 * Report Related URI's
 */
export const API_REPORT_WF_DTR = `${BASE_URL}Services/Reports.svc/Reports/WFAM?allrecords=true`; // WF DTR Report
export const API_REPORT_PR_REVIEW = `${BASE_URL}Services/Reports.svc/Reports/Payroll?allrecords=true`; // Finance Payroll Review Report
export const API_PR_DTR = `${BASE_URL}Services/Employee/WorkForce.svc/DTR`;

/**
 * Forms
 */
export const API_LEAVEREQLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/LeaveRequestList`;
export const API_LEAVEREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/LeaveRequest`;
export const API_FORMUPDATESTATUS = `${BASE_URL}Services/Employee/WorkFlow.svc/FormRequestStepStatus/`;
export const API_OTFORMS = `${BASE_URL}Services/Employee/WorkFlow.svc/OTRequest`;
export const API_RETRIEVEOTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/OTRequestList`;
export const API_EMPLEAVECOUNT = `${BASE_URL}Services/Employee/EmployeeRec.svc/EmpLeaveCount/`;
export const API_COEREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/COERequest`;
export const API_RETRIEVECOELIST = `${BASE_URL}Services/Employee/WorkFlow.svc/COERequestList`;
export const API_SHIFTSCHEDREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/ShiftScheduleRequest`;
export const API_CUSTOMFORMS = `${BASE_URL}Services/Employee/WorkFlow.svc/CustomFormRequest`;
export const API_CUSTOMFORMSLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/CustomFormRequestList`;
export const API_IRFREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/IRFRequest`;
export const API_IRF_RETRIEVELIST = `${BASE_URL}Services/Employee/WorkFlow.svc/IRFRequestList`;
export const API_RTWOREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/RTWORequest`;
export const API_LCFREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/LCFRequest`;
export const API_LCFREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/LCFRequestList`;
export const API_SCMREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/SCMRequest`;
export const API_SCMREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/SCMRequestList`;
export const API_SHFREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/HearingRequest`;
export const API_SHREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/HearingRequestList`;
export const API_RTWOREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/RTWORequestList`;
export const API_SHIFTREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/ShiftScheduleRequestList`;
export const API_TERMINATIONREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/TerminationRequest`;
export const API_TERMINATIONREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/TerminationRequestList`;
export const API_HRFREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/HRFRequest`;
export const API_HRFREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/HRFRequestList`;
export const API_DTRREQUESTLIST = `${BASE_URL}Services/Employee/WorkFlow.svc/DTRReconciliationRequestList`;
export const API_DTRREQUEST = `${BASE_URL}Services/Employee/WorkFlow.svc/DTRReconciliationRequest`;


/**
 * WorkGroup Admin
 */
export const API_DEPARTMENTLIST = `${BASE_URL}Services/AdminPanel.svc/DepartmentList`;
export const API_DEPARTMENT = `${BASE_URL}Services/AdminPanel.svc/Department`;
export const API_ORGWORK = `${BASE_URL}Services/Employee/Management.svc/Organization`;
export const API_TEAMLIST = `${BASE_URL}Services/Employee/Management.svc/TeamList`;
export const API_TEAMMEMBER = `${BASE_URL}Services/Employee/Management.svc/TeamMember`;
export const API_TEAMMEMBERLIST = `${BASE_URL}/Services/Employee/Management.svc/TeamMembersList`;
export const API_TEAM = `${BASE_URL}Services/Employee/Management.svc/Team`;
export const API_MOVEMEMBERS = `${BASE_URL}Services/Employee/Management.svc/MoveMembers`; // params: oldDeptID or oldTeamID || newDeptID or newTeamID

/**
 * Shift Template
 */
export const API_SHIFTFORDEPARTMENT = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftScheduleForDepartment/`;
export const API_SHIFTFORTEAM = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftScheduleForTeam/`;
export const API_SHIFTTEMPLATES = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftSchedules`;
export const API_SHIFTSCHEDULE = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftSchedule`;
export const API_SHIFTFOREMPLOYEE = `${BASE_URL}Services/Employee/WorkForce.svc/ShiftScheduleForEmployee/`;

/**
 * Work Status Template
 */
export const API_WORKSTATUS = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusTemplateList`;
export const API_WORKSTATUSFORMLOAD = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusFormLoad`;
export const API_WORKSTATUSTEMPLATE = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusTemplate`;
export const API_WORKSTATUSFORDEPARTMENT = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusForDepartment/`;
export const API_WORKSTATUSFORTEAM = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusForTeam/`;
export const API_WORKSTATUSFOREMPLOYEE = `${BASE_URL}Services/Employee/WorkForce.svc/WorkStatusForEmployee/`;

/**
 * Calendar Template
 */
export const API_CALENDARLIST = `${BASE_URL}Services/Employee/Management.svc/CalendarList`;
export const API_CALENDARFORMLOAD = `${BASE_URL}Services/Employee/Management.svc/CalendarFormLoad`;
export const API_CALENDARFORDEPARTMENT = `${BASE_URL}Services/Employee/Management.svc/CalendarForDepartment/`;
export const API_CALENDARFORTEAM = `${BASE_URL}Services/Employee/Management.svc/CalendarForTeam/`;
export const API_CALENDARFOREMP = `${BASE_URL}Services/Employee/Management.svc/CalendarForEmployee/`;

/**
 * Payroll Cutoff
 */
export const API_PAYROLLCUTOFF = `${BASE_URL}Services/Finance/Payroll.svc/Cutoff`;
export const API_PAYROLLCUTOFFLIST = `${BASE_URL}Services/Finance/Payroll.svc/CutoffList`;
export const API_PAYROLLCUTFORDEPARTMENT = `${BASE_URL}Services/Finance/Payroll.svc/CutoffForDepartment/`;
export const API_PAYROLLCUTFORTEAM = `${BASE_URL}Services/Finance/Payroll.svc/CutoffForTeam/`;
export const API_PAYROLLCUTFOREMP = `${BASE_URL}Services/Finance/Payroll.svc/CutoffForEmployee/`;

/**
 * Workflow and Approval
 */
export const API_WORKFLOWTEMPLATELIST = `${BASE_URL}Services/Employee/Management.svc/WorkFlowProcTemplateList`;
export const API_WORKFLOWTEMPLATE = `${BASE_URL}Services/Employee/Management.svc/WorkFlowProcTemplate`;
export const API_ASSIGNWORKFLOW = `${BASE_URL}Services/Employee/WorkFlow.svc/WorkGroupWorkFlow`;
export const API_ENTITYWORKFLOW = `${BASE_URL}Services/Employee/WorkFlow.svc/WorkGroupWorkFlowByEntity`;
export const API_WORKFLOW_TEMPLATESTEP = `${BASE_URL}Services/Employee/Management.svc/WorkFlowProcTemplateStep`;

/**
 * Access and Permissions
 */
export const API_MODULES = `${BASE_URL}Services/Employee/AdminPanel.svc/ModuleList`;
export const API_PERMISSIONTEMPLATE = `${BASE_URL}Services/Employee/AdminPanel.svc/AccessPermissionTemplate/`; // NOTE: add TemplateID guid after the / in the url to assign to emp
export const API_TIMECONSTRAINT = `${BASE_URL}Services/Employee/AdminPanel.svc/TimeConstrRefsList`;
export const API_PERMISSIONREFS = `${BASE_URL}Services/Employee/AdminPanel.svc/PermissionRefsList`;
export const API_UNASSIGNPERMISSION = `${BASE_URL}Services/Employee/AdminPanel.svc/AccessPermissionTemplateForEmployee/`; // NOTE: add EmpID after the /

/**
 * Alerts and Notifications
 */
export const API_ALERTSNOTIF = `${BASE_URL}Services/Employee/Management.svc/AlertsAndNotifs`;
export const API_SEENALERTSNOTIF = `${BASE_URL}Services/Employee/Management.svc/ReadAlertsAndNotifs/`; // NOTE: add AlertNotifID after the /

/**
 * Work Monitoring
 */
export const API_WORKMONITORING = `${BASE_URL}Services/Employee/WorkForce.svc/WorkMonitoring`;
export const API_WORKMONITORINGLIST = `${BASE_URL}Services/Employee/WorkForce.svc/WorkMonitoringList`;
export const API_WORKMONITORINGFORDEPARTMENT = `${BASE_URL}Services/Employee/WorkForce.svc/WorkMonitoringForDepartment/`;
export const API_WORKMONITORINGFORTEAM = `${BASE_URL}Services/Employee/WorkForce.svc/WorkMonitoringForTeam/`;
export const API_WORKMONITORINGFOREMP = `${BASE_URL}Services/Employee/WorkForce.svc/WorkMonitoringForEmployee/`;

/*
 * All our static references to be compared on our retrieved datas from API
 * Declare it here and use it globally
 * Note: DO NOT declared API related const here, instead declare it above this comment
 * eg: DEFAULT_GUID, JO_STATUSPPE
 */
export const DEFAULT_GUID = '00000000-0000-0000-0000-000000000000';
export const JO_STATUSPPE = '75b7f0ec-5d98-48ad-9637-d8d351d470cf';
export const JO_STATUSPENDING = '9db45ac8-7bbd-4e8b-b1a5-b95c943a5719';
export const JO_STATUSREJECT = 'bef160a9-568b-45ad-b598-3d4a55a98ae5';
export const JO_STATUSREMOVE = 'a260945c-7f52-4db4-b79b-caacd4ee5a2d';

/* User Access */
export const EMP_STATUS_ACTIVE = '6a8d6aa6-bf7b-4df6-8ff5-7a478752b3fe';
export const EMP_STATUS_INACTIVE = '16c7b241-4bfe-4116-8d3f-874274ed96f2';
export const EMP_STATUS_BLOCKED = '785e2353-ca80-4140-84c8-94058fcddf06';
export const EMP_STATUS_TERMINATED = '2d51fb9a-8352-4e8b-8568-49975e7f3de6';
export const EMP_STATUS_RESIGNED = '72e9cd39-4714-4488-b186-39a7c8af04d2';
export const EMP_STATUS_NEW = '8919ae6e-0ea1-4952-ab3e-83b254ecf829';
export const EMP_STATUS_SUSPENDED = 'a8347e17-e51c-4ef8-803f-55a6ccb998ff';
export const EMP_STATUS_REGULAR = 'a154d71c-bbe5-437a-a4b8-d363127ae880';

/* WorkForce and Org Chart */
export const WF_COMPID = 'B33E79D2-8C24-495E-892E-75F2BEF627BA';
export const WF_WORKSTATSTATUSACTIVE = 'E1B5380A-AA16-416C-8DBE-7435BDEB893C';
export const WF_WORKSTATSTATUSINACTIVE = 'AF86DF7B-9F0B-4285-A080-BF77BBDF2B98';

/* Forms */
export const FORMREQUEST_PENDING = '8cc8bd05-8045-4617-94bd-07c49138fe8c';
export const FORMREQUEST_CANCEL = '487284dd-ce92-42ed-98ce-44a4f21e8f48';
export const FORMREQUEST_APPROVE = 'a349aaef-d88a-49c1-86c4-c0088a98890c';
export const FORMREQUEST_REJECT = '3d7d5bb5-6a0c-44f7-b7bb-c55e7741c772';
export const COEFORMREQUEST_CUSTOM = 'aad3805f-d68c-4a0f-b960-8d844e4a6856';
export const RTWO_OTHERSREFS = '6fd40fe0-9cde-4b51-9646-b837b7973c16';
export const WF_FORMTYPEID = 'c39a34f6-abd1-4de2-95f9-3a51e971996e';

/* Access and Permissions NOTE: do not put all static permission guid here, use the refs, this one is only for the gen admin access and permission page */
export const PERMISSION_ALL = '80592f44-0824-48a3-ae5e-58aa082ea5e8';
export const PERMISSION_READONLY = '1b1ff7bc-2b15-4dd1-b376-2c3854579077';
export const GENERAL_GUID = '5888c959-bef7-4875-96b0-838a6582ca61';
export const MANAGEMENT_GUID = 'e7353fb1-5938-4ccd-bd81-a5fe15df804c';
export const HRD_GUID = 'aa65ec58-3a24-46f1-9d74-8d9bb06827a0';
export const MIS_GUID = '85e4f910-9bcd-43aa-a185-a2b11980c955';
export const WFD_GUID = 'd503cb04-2e87-4f46-b735-53410f0289de';
export const FIN_GUID = 'b8738f73-5932-41fc-8590-8dadedb7ecfe';

/**
 * One Signal APP IDs
 * NOTE: delete this when app is going to prod
 *       and use the app id for prod in index.html
 *
 * HCM STAGING (vkpowfprwebapp-staginghris.azurewebsites.net) => "9f1c4b48-ae91-4019-8911-271bb3770818"
 * HCM LOCAL (localhost:3000) => "d779159e-c49c-4070-afc3-11319b840c8c"
 * HCM PNS (hcmapistaging-pns.azurewebsites.net) => "d78b1a2d-1de5-49bd-89db-3e04d72d3b0d"
 * HCM VKPO (vkpowfprwebapp-hris.azurewebsites.net) => bc57ce15-6da3-4357-8c71-244658689111
 */
