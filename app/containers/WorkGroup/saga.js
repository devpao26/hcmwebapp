/**
 * WorkGroup sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  DEFAULT_GUID,
  API_ORGWORK,
  API_EMPLISTS,
  API_TEAM, API_TEAMLIST, API_TEAMMEMBER, // Team related APIs
  API_CALENDARLIST, API_CALENDARFORDEPARTMENT, API_CALENDARFORTEAM, API_CALENDARFOREMP, // API_CALENDARFORMLOAD, // Calendar templates
  API_SHIFTTEMPLATES, API_SHIFTFORDEPARTMENT, API_SHIFTFORTEAM, API_SHIFTFOREMPLOYEE, // Shift Schedule templates
  API_PAYROLLCUTOFFLIST, API_PAYROLLCUTFORDEPARTMENT, API_PAYROLLCUTFORTEAM, API_PAYROLLCUTFOREMP, // Payroll Cutoff templates
  API_WORKSTATUS, API_WORKSTATUSFORDEPARTMENT, API_WORKSTATUSFORTEAM, API_WORKSTATUSFOREMPLOYEE, // Work Status templates
  API_WORKMONITORINGLIST, API_WORKMONITORINGFORDEPARTMENT, API_WORKMONITORINGFORTEAM, API_WORKMONITORINGFOREMP, // Work Monitoring templates (desktop configuration)
  API_DEPARTMENT, API_DEPARTMENTLIST,
  API_EMPPROFILE,
  API_MOVEMEMBERS,
} from 'containers/App/constants';

import {
  sessionIsExpired,
  // apiServerError,
} from 'containers/App/actions';

import {
  makeSelectUsername,
  makeSelectToken,
} from 'containers/App/selectors';

import {
  // GET_REFS,
  GET_ORG,
  GET_EMP, GET_EMP_NORESETPAGE,
  ENROLL_EMP, UNENROLL_EMP,
  GET_TEMPLATES, GET_TEMPLATES_NORESETPAGE,
  ASSIGN_TEMPLATE, ASSIGN_EMPHEAD,
  CREATE_GROUP, DELETE_GROUP, RENAME_GROUP,
  DISABLE_EMP,
  VIEW_DETAILS,
  UNASSIGN_TEMPLATE,
  GET_TRANSFERLIST,
  TRANSFER,
  GET_TRANSFERLIST_NORESET,
} from './constants';

import {
  getGroupListSuccess, getGroupListError,
  getEmpListSuccess, getEmpListError,
  getEnrollEmpsSuccess, getEnrollEmpsError,
  getUnEnrollEmpsSuccess, getUnEnrollEmpsError,
  getTemplatesSuccess, getTemplatesError,
  getAssignTemplateSuccess, getAssignTemplateError,
  getAssignEmpHeadSuccess, getAssignEmpHeadError,
  getCreateNewSuccess, getCreateNewError,
  getDeleteGroupSuccess, getDeleteGroupError,
  getRenameGroupSuccess, getRenameGroupError,
  getDisableAccountSuccess, getDisableAccountError,
  getViewDetailsSuccess, getViewDetailsError,
  getUnassignTemplateError,
  getUnassignTemplateSuccess,
  getTransferSuccess,
  getTransferError,
  getTransferListSuccess,
  getTransferListError,
} from './actions';

import {
  makeSelectIsTeam,
  makeSelectID,
  makeSelectIsEnrolled,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectIsAll,
  makeSelectData,
  makeSelectTeamID,
  makeSelectDeptID,
  makeSelectName,
  makeSelectAssignTo,
  makeSelectTemplateID,
  makeSelectEmpID,
  makeSelectEmpStatus,
  makeSelectOldGroupID,
  makeSelectNewGroupID,
  makeSelectOldIsTeam,
  makeSelectNewIsTeam,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Get the workgroup list request/response handler
 */
export function* getGroupList() {
  const requestURL = API_ORGWORK;
  const isTeam = yield select(makeSelectIsTeam('groupList'));
  const id = yield select(makeSelectID('groupList'));

  let DeptID;
  let TeamID;
  if (isTeam && id) {
    TeamID = id;
  }

  if (!isTeam && id) {
    DeptID = id;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'AllTeams': false,
      DeptID,
      TeamID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetOrgStructureResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getGroupListSuccess(data));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getGroupListError(resp));
      }
    }
  } catch (err) {
    yield put(getGroupListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get Employee List request/response handler
 */
export function* getEmpList() {
  const requestURL = API_EMPLISTS;

  // Retrieve refences for our fetch body
  const groupID = yield select(makeSelectID('empList'));
  const isTeam = yield select(makeSelectIsTeam('empList'));
  const isEnrolled = yield select(makeSelectIsEnrolled('empList'));
  const isAll = yield select(makeSelectIsAll('empList'));
  const PageIndex = yield select(makeSelectPageIndex('empList'));
  const search = yield select(makeSelectSearch('empList'));

  if (PageIndex) {
    pageIndex = PageIndex;
  }

  let FirstAndLastName;
  if (search) {
    FirstAndLastName = search;
  }

  let NotInTeamID;
  let NotInDeptID;
  let InDeptID;
  let InTeamID;
  let NotEnrolledToAny;

  if (isAll && !isEnrolled) {
    if (isTeam) {
      NotInTeamID = groupID;
    } else {
      NotInDeptID = groupID;
    }
  }
  if (!isAll && !isEnrolled) {
    NotEnrolledToAny = true;
  }

  if (isEnrolled) {
    if (isTeam) {
      InTeamID = groupID;
    } else {
      InDeptID = groupID;
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': pageSize,
        'PageIndex': pageIndex,
        'SortBy': 'LastName',
        'SortExpression': 'ASC',
      },
      'Includes': {
        'inShortDetails': true,
        'withAvatar': true,
        'withWorkGroup': true,
      },
      NotEnrolledToAny,
      FirstAndLastName,
      NotInTeamID,
      NotInDeptID,
      InDeptID,
      InTeamID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield put(getEmpListSuccess(data, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmpListError(resp));
      }
    }
  } catch (err) {
    yield put(getEmpListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Enroll employee request/response handler
 */
export function* getEnrollEmp() {
  const isTeam = yield select(makeSelectIsTeam('enrollEmp'));
  const empIDs = yield select(makeSelectData('enrollEmp'));
  const teamID = yield select(makeSelectTeamID('enrollEmp'));
  const deptID = yield select(makeSelectDeptID('enrollEmp'));

  let requestURL;
  if (isTeam) {
    requestURL = `${API_TEAMMEMBER}?&teamID=${teamID}`;
  } else {
    requestURL = `${API_TEAMMEMBER}?&deptID=${deptID}`;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(empIDs),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddTeamMembersResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getEnrollEmpsSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrollEmpsError(resp, resp.ObjectList));
      }
    }
  } catch (err) {
    yield put(getEnrollEmpsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Enroll employee request/response handler
 */
export function* getUnEnrollEmp() {
  const isTeam = yield select(makeSelectIsTeam('unenrollEmp'));
  const empIDs = yield select(makeSelectData('unenrollEmp'));
  const teamID = yield select(makeSelectTeamID('unenrollEmp'));
  const deptID = yield select(makeSelectDeptID('unenrollEmp'));

  let requestURL;
  if (isTeam) {
    requestURL = `${API_TEAMMEMBER}/${deptID}/${teamID}`;
  } else {
    requestURL = `${API_TEAMMEMBER}/${deptID}/${DEFAULT_GUID}`;
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(empIDs),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.DeleteDeptOrTeamMembersResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUnEnrollEmpsSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUnEnrollEmpsError(resp, resp.ObjectList));
      }
    }
  } catch (err) {
    yield put(getEnrollEmpsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get Templates Sagas
 */
export function* getTemplates() {
  const search = yield select(makeSelectSearch('templateList'));
  let Name;
  if (search) Name = search;

  const PageIndex = yield select(makeSelectPageIndex('templateList'));
  if (PageIndex) pageIndex = PageIndex;

  const name = yield select(makeSelectName('templateList'));

  let requestURL;

  if (name === 'Calendar') requestURL = API_CALENDARLIST;
  if (name === 'Shift') requestURL = API_SHIFTTEMPLATES;
  if (name === 'Payroll') requestURL = API_PAYROLLCUTOFFLIST;
  if (name === 'WorkStat') requestURL = API_WORKSTATUS;
  if (name === 'DeskConfig') requestURL = API_WORKMONITORINGLIST;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': pageSize,
        'PageIndex': pageIndex,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      Name,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (name === 'Calendar') resp = apirequest.CalendarListingsResult[0];
    if (name === 'Shift') resp = apirequest.GetShiftTemplateListingsResult[0];
    if (name === 'Payroll') resp = apirequest.GetCutoffTemplateListingsResult[0];
    if (name === 'WorkStat') resp = apirequest.GetWorkStatusTemplateListingsResult[0];
    if (name === 'DeskConfig') resp = apirequest.GetWorkMonitoringTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getTemplatesSuccess(data, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTemplatesError(resp));
      }
    }
  } catch (err) {
    yield put(getTemplatesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Assign Template to dept/team/employee request/response handler
 */
export function* getAssignTemplate() {
  const assignTo = yield select(makeSelectAssignTo('assignTemplate'));
  const templateID = yield select(makeSelectTemplateID('assignTemplate'));
  const groupID = yield select(makeSelectID('assignTemplate'));
  const templateCat = yield select(makeSelectName('assignTemplate'));

  let requestURL;
  // Assign Calendar
  if (templateCat === 'Calendar' && assignTo === 'Dept') requestURL = `${API_CALENDARFORDEPARTMENT}${templateID}/${groupID}`;
  if (templateCat === 'Calendar' && assignTo === 'Team') requestURL = `${API_CALENDARFORTEAM}${templateID}/${groupID}`;
  if (templateCat === 'Calendar' && assignTo === 'Emp') requestURL = `${API_CALENDARFOREMP}${templateID}/${groupID}`;

  // Assign Shift
  if (templateCat === 'Shift' && assignTo === 'Dept') requestURL = `${API_SHIFTFORDEPARTMENT}${templateID}/${groupID}`;
  if (templateCat === 'Shift' && assignTo === 'Team') requestURL = `${API_SHIFTFORTEAM}${templateID}/${groupID}`;
  if (templateCat === 'Shift' && assignTo === 'Emp') requestURL = `${API_SHIFTFOREMPLOYEE}${templateID}/${groupID}`;

  // Assign Payroll Cutoff
  if (templateCat === 'Payroll' && assignTo === 'Dept') requestURL = `${API_PAYROLLCUTFORDEPARTMENT}${templateID}/${groupID}`;
  if (templateCat === 'Payroll' && assignTo === 'Team') requestURL = `${API_PAYROLLCUTFORTEAM}${templateID}/${groupID}`;
  if (templateCat === 'Payroll' && assignTo === 'Emp') requestURL = `${API_PAYROLLCUTFOREMP}${templateID}/${groupID}`;

  // Assign Work Status
  if (templateCat === 'WorkStat' && assignTo === 'Dept') requestURL = `${API_WORKSTATUSFORDEPARTMENT}${templateID}/${groupID}`;
  if (templateCat === 'WorkStat' && assignTo === 'Team') requestURL = `${API_WORKSTATUSFORTEAM}${templateID}/${groupID}`;
  if (templateCat === 'WorkStat' && assignTo === 'Emp') requestURL = `${API_WORKSTATUSFOREMPLOYEE}${templateID}/${groupID}`;

  // Assign Work Monitoring
  if (templateCat === 'DeskConfig' && assignTo === 'Dept') requestURL = `${API_WORKMONITORINGFORDEPARTMENT}${templateID}/${groupID}`;
  if (templateCat === 'DeskConfig' && assignTo === 'Team') requestURL = `${API_WORKMONITORINGFORTEAM}${templateID}/${groupID}`;
  if (templateCat === 'DeskConfig' && assignTo === 'Emp') requestURL = `${API_WORKMONITORINGFOREMP}${templateID}/${groupID}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    // Calendar resp
    if (templateCat === 'Calendar' && assignTo === 'Dept') resp = apirequest.AssignCalendarToDepartmentResult[0];
    if (templateCat === 'Calendar' && assignTo === 'Team') resp = apirequest.AssignCalendarToTeamResult[0];
    if (templateCat === 'Calendar' && assignTo === 'Emp') resp = apirequest.AssignCalendarToEmployeeResult[0];
    // Shift resp
    if (templateCat === 'Shift' && assignTo === 'Dept') resp = apirequest.AssignShiftScheduleToDepartmentResult[0];
    if (templateCat === 'Shift' && assignTo === 'Team') resp = apirequest.AssignShiftScheduleToTeamResult[0];
    if (templateCat === 'Shift' && assignTo === 'Emp') resp = apirequest.AssignShiftScheduleToEmployeeResult[0];
    // Payroll resp
    if (templateCat === 'Payroll' && assignTo === 'Dept') resp = apirequest.AssignCutoffToDepartmentResult[0];
    if (templateCat === 'Payroll' && assignTo === 'Team') resp = apirequest.AssignCutoffToTeamResult[0];
    if (templateCat === 'Payroll' && assignTo === 'Emp') resp = apirequest.AssignCutoffToEmployeeResult[0];
    // Work Status resp
    if (templateCat === 'WorkStat' && assignTo === 'Dept') resp = apirequest.AssignWorkStatusToDepartmentResult[0];
    if (templateCat === 'WorkStat' && assignTo === 'Team') resp = apirequest.AssignWorkStatusToTeamResult[0];
    if (templateCat === 'WorkStat' && assignTo === 'Emp') resp = apirequest.AssignWorkStatusToEmployeeResult[0];
    // Work Monitoring (Desk Config) resp
    if (templateCat === 'DeskConfig' && assignTo === 'Dept') resp = apirequest.AssignWorkMonitoringToDepartmentResult[0];
    if (templateCat === 'DeskConfig' && assignTo === 'Team') resp = apirequest.AssignWorkMonitoringToTeamResult[0];
    if (templateCat === 'DeskConfig' && assignTo === 'Emp') resp = apirequest.AssignWorkMonitoringToEmployeeResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getAssignTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAssignTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getAssignTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Assign Template to dept/team/employee request/response handler
 */
export function* getUnassignTemplate() {
  const groupID = yield select(makeSelectID('unassignTemplate'));
  const templateCat = yield select(makeSelectName('unassignTemplate'));
  const isTeam = yield select(makeSelectIsTeam('unassignTemplate'));

  let requestURL;
  // Assign Calendar
  if (templateCat === 'Calendar' && !isTeam) requestURL = `${API_CALENDARFORDEPARTMENT}${groupID}`;
  if (templateCat === 'Calendar' && isTeam) requestURL = `${API_CALENDARFORTEAM}${groupID}`;

  // Assign Shift
  if (templateCat === 'Shift' && !isTeam) requestURL = `${API_SHIFTFORDEPARTMENT}${groupID}`;
  if (templateCat === 'Shift' && isTeam) requestURL = `${API_SHIFTFORTEAM}${groupID}`;

  // Assign Payroll Cutoff
  if (templateCat === 'Payroll' && !isTeam) requestURL = `${API_PAYROLLCUTFORDEPARTMENT}${groupID}`;
  if (templateCat === 'Payroll' && isTeam) requestURL = `${API_PAYROLLCUTFORTEAM}${groupID}`;

  // Assign Work Status
  if (templateCat === 'WorkStat' && !isTeam) requestURL = `${API_WORKSTATUSFORDEPARTMENT}${groupID}`;
  if (templateCat === 'WorkStat' && isTeam) requestURL = `${API_WORKSTATUSFORTEAM}${groupID}`;

  // Assign Work Monitoring
  if (templateCat === 'DeskConfig' && !isTeam) requestURL = `${API_WORKMONITORINGFORDEPARTMENT}${groupID}`;
  if (templateCat === 'DeskConfig' && isTeam) requestURL = `${API_WORKMONITORINGFORTEAM}${groupID}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    // Calendar resp
    if (templateCat === 'Calendar' && !isTeam) resp = apirequest.UnassignCalendarToDepartmentResult[0];
    if (templateCat === 'Calendar' && isTeam) resp = apirequest.UnassignCalendarToTeamResult[0];
    // Shift resp
    if (templateCat === 'Shift' && !isTeam) resp = apirequest.UnassignShiftScheduleToDepartmentResult[0];
    if (templateCat === 'Shift' && isTeam) resp = apirequest.UnassignShiftScheduleToTeamResult[0];
    // Payroll resp
    if (templateCat === 'Payroll' && !isTeam) resp = apirequest.UnassignCutoffToDepartmentResult[0];
    if (templateCat === 'Payroll' && isTeam) resp = apirequest.UnassignCutoffToTeamResult[0];
    // Work Status resp
    if (templateCat === 'WorkStat' && !isTeam) resp = apirequest.UnassignWorkStatusToDepartmentResult[0];
    if (templateCat === 'WorkStat' && isTeam) resp = apirequest.UnassignWorkStatusToTeamResult[0];
    // Work Monitoring (Desk Config) resp
    if (templateCat === 'DeskConfig' && !isTeam) resp = apirequest.UnassignWorkMonitoringToDepartmentResult[0];
    if (templateCat === 'DeskConfig' && isTeam) resp = apirequest.UnassignWorkMonitoringToTeamResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUnassignTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUnassignTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getUnassignTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Assign Employee as Head request/response handler
 */
export function* getAssignEmpHead() {
  const isTeam = yield select(makeSelectIsTeam('assignHead'));
  const empID = yield select(makeSelectEmpID('assignHead'));
  const groupID = yield select(makeSelectID('assignHead'));

  let requestURL = `${API_DEPARTMENT}/${groupID}`;
  if (isTeam) requestURL = `${API_TEAM}/${groupID}`;

  let TeamHeadID;
  let DeptHead;
  if (isTeam) TeamHeadID = empID;
  if (!isTeam) DeptHead = empID;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      TeamHeadID,
      DeptHead,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam) resp = apirequest.UpdateTeamResult[0];
    if (!isTeam) resp = apirequest.UpdateDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getAssignEmpHeadSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAssignEmpHeadError(resp));
      }
    }
  } catch (err) {
    yield put(getAssignEmpHeadError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Create Group request/response handler
 */
export function* getCreateNewGroup() {
  const name = yield select(makeSelectName('create'));
  const isTeam = yield select(makeSelectIsTeam('create'));
  const groupID = yield select(makeSelectID('create'));

  let DeptID;
  let ParentID;
  if (isTeam === 'Department') DeptID = groupID;
  if (isTeam === 'Team') ParentID = groupID;

  let requestURL;
  if (isTeam === 'Team' || isTeam === 'Department') requestURL = API_TEAM;
  if (isTeam === 'Company') requestURL = API_DEPARTMENT;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'Name': name,
      DeptID,
      ParentID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam === 'Team' || isTeam === 'Department') resp = apirequest.CreateTeamResult[0];
    if (isTeam === 'Company') resp = apirequest.CreateDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getCreateNewSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getCreateNewError(resp));
      }
    }
  } catch (err) {
    yield put(getCreateNewError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Delete Group request/response handler
 */
export function* getDeleteGroup() {
  const isTeam = yield select(makeSelectIsTeam('delete'));
  const groupID = yield select(makeSelectID('delete'));

  let requestURL;
  if (isTeam) requestURL = `${API_TEAM}/${groupID}`;
  if (!isTeam) requestURL = `${API_DEPARTMENT}/${groupID}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam) resp = apirequest.DeleteTeamResult[0];
    if (!isTeam) resp = apirequest.DeleteDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getDeleteGroupSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDeleteGroupError(resp));
      }
    }
  } catch (err) {
    yield put(getDeleteGroupError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Rename Group
 */
export function* getRenameGroup() {
  // const headID = yield select(makeSelectEmpID('rename'));
  const isTeam = yield select(makeSelectIsTeam('rename'));
  const groupID = yield select(makeSelectID('rename'));
  const name = yield select(makeSelectName('rename'));

  let requestURL;
  if (isTeam) requestURL = `${API_TEAM}/${groupID}`;
  if (!isTeam) requestURL = `${API_DEPARTMENT}/${groupID}`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'Name': name,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam) resp = apirequest.UpdateTeamResult[0];
    if (!isTeam) resp = apirequest.UpdateDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getRenameGroupSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getRenameGroupError(resp));
      }
    }
  } catch (err) {
    yield put(getRenameGroupError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Disable Employee account
 */
export function* getDisableAccount() {
  const empID = yield select(makeSelectEmpID('disableEmp'));
  const status = yield select(makeSelectEmpStatus('disableEmp'));

  const requestURL = `${API_EMPPROFILE}${empID}`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'EmpStatusID': status,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateEmpProfileResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getDisableAccountSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDisableAccountError(resp));
      }
    }
  } catch (err) {
    yield put(getDisableAccountError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * View Template Details
 */
export function* getGroupDetails() {
  const id = yield select(makeSelectID('viewDetails'));
  const isTeam = yield select(makeSelectIsTeam('viewDetails'));

  let requestURL;
  let TeamID;
  let DeptID;
  if (isTeam) {
    requestURL = API_TEAMLIST;
    TeamID = id;
  }
  if (!isTeam) {
    requestURL = API_DEPARTMENTLIST;
    DeptID = id;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      TeamID,
      DeptID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam) resp = apirequest.GetTeamsOnlyResult[0];
    if (!isTeam) resp = apirequest.GetDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getViewDetailsSuccess(data));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getViewDetailsError(resp));
      }
    }
  } catch (err) {
    yield put(getViewDetailsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Transfer List
 */
export function* getTransferList() {
  const id = yield select(makeSelectID('transferList'));
  const isTeam = yield select(makeSelectIsTeam('transferList'));
  const page = yield select(makeSelectPageIndex('transferList'));
  const search = yield select(makeSelectSearch('transferList'));

  if (page) pageIndex = page;

  let Name;
  let TeamName;
  if (search && (!isTeam && !id)) Name = search;
  if (search && (isTeam || (!isTeam && id))) TeamName = search;

  let requestURL;
  if (isTeam || (!isTeam && id)) requestURL = API_TEAMLIST;
  if (!isTeam && !id) requestURL = API_DEPARTMENTLIST;

  let ParentID;
  let DeptID;
  let HierarchyLvl;
  if (isTeam) ParentID = id;
  if (!isTeam && id) {
    DeptID = id;
    HierarchyLvl = 0;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': pageSize,
        'PageIndex': pageIndex,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      TeamName,
      Name,
      ParentID,
      DeptID,
      HierarchyLvl,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam || (!isTeam && id)) resp = apirequest.GetTeamsOnlyResult[0];
    if (!isTeam && !id) resp = apirequest.GetDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getTransferListSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTransferListError(resp));
      }
    }
  } catch (err) {
    yield put(getTransferListError(err));
    // yield put(apiServerError());
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Transfer Employee/Team
 */
export function* getTransfer() {
  const empIDs = yield select(makeSelectID('transfer'));
  const oldGroupID = yield select(makeSelectOldGroupID());
  const newGroupID = yield select(makeSelectNewGroupID());
  const oldIsTeam = yield select(makeSelectOldIsTeam());
  const newIsTeam = yield select(makeSelectNewIsTeam());

  let oldID;
  if (oldIsTeam) oldID = `?oldTeamID=${oldGroupID}`;
  if (!oldIsTeam) oldID = `?oldDeptID=${oldGroupID}`;

  let newID;
  if (newIsTeam) newID = `&newTeamID=${newGroupID}`;
  if (!newIsTeam) newID = `&newDeptID=${newGroupID}`;

  const requestURL = API_MOVEMEMBERS + oldID + newID;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify(empIDs),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.MoveTeamMembersResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getTransferSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTransferError(resp));
      }
    }
  } catch (err) {
    yield put(getTransferError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* workgroupSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_ORG, getGroupList);
  yield takeLatest(GET_EMP, getEmpList);
  yield takeLatest(GET_EMP_NORESETPAGE, getEmpList);
  yield takeLatest(ENROLL_EMP, getEnrollEmp);
  yield takeLatest(UNENROLL_EMP, getUnEnrollEmp);
  yield takeLatest(GET_TEMPLATES, getTemplates);
  yield takeLatest(GET_TEMPLATES_NORESETPAGE, getTemplates);
  yield takeLatest(ASSIGN_TEMPLATE, getAssignTemplate);
  yield takeLatest(ASSIGN_EMPHEAD, getAssignEmpHead);
  yield takeLatest(CREATE_GROUP, getCreateNewGroup);
  yield takeLatest(DELETE_GROUP, getDeleteGroup);
  yield takeLatest(RENAME_GROUP, getRenameGroup);
  yield takeLatest(DISABLE_EMP, getDisableAccount);
  yield takeLatest(VIEW_DETAILS, getGroupDetails);
  yield takeLatest(UNASSIGN_TEMPLATE, getUnassignTemplate);
  yield takeLatest(GET_TRANSFERLIST, getTransferList);
  yield takeLatest(GET_TRANSFERLIST_NORESET, getTransferList);
  yield takeLatest(TRANSFER, getTransfer);
}
