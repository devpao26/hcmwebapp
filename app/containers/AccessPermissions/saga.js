/**
 * General Admin Access and Permissions sagas
 */
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_MODULES,
  API_PERMISSIONTEMPLATE,
  API_TIMECONSTRAINT,
  API_PERMISSIONREFS,
  API_UNASSIGNPERMISSION,
  GENERAL_GUID,
  MANAGEMENT_GUID,
  HRD_GUID,
  MIS_GUID,
  WFD_GUID,
  FIN_GUID,
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
  GET_EMPLIST,
  GET_EMPLIST_NORESET,
  GET_MODULES,
  ASSIGN_ACCESS,
  GET_REFS,
  UNASSIGN_TEMPLATE,
} from './constants';

import {
  getEmpListSuccess, getEmpListError,
  getMainModulesSuccess, getMainModulesError,
  getAssignAcessSuccess, getAssignAccessError,
  getRefsSuccess, getRefsError,
  getSubModulesSuccess,
  getSubModulesError,
  getRemoveTemplateSuccess,
  getRemoveTemplateError,
} from './actions';

import {
  makeSelectSearch,
  makeSelectPageIndex,
  makeSelectData,
  makeSelectEmpID,
  makeSelectIsGenAdmin,
  makeSelectRequester,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Get Employee List request/response handler
 */
export function* getEmpList() {
  const requestURL = API_EMPLISTS;

  const page = yield select(makeSelectPageIndex('empList'));
  if (page) pageIndex = page;

  const search = yield select(makeSelectSearch('empList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

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
        'withAvatar': true,
        'withAccessModulePermission': true,
      },
      FirstAndLastName,
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
 * Get the Main Modules for Access and Permissions request/response handler
 */
export function* getMainModules() {
  const isGenAdmin = yield select(makeSelectIsGenAdmin());
  let IsMainModule = 'false';
  if (isGenAdmin) IsMainModule = 'true';

  const requester = yield select(makeSelectRequester());
  let ParentID;
  if (requester === 'HR') ParentID = HRD_GUID;
  if (requester === 'WF') ParentID = WFD_GUID;
  if (requester === 'IT') ParentID = MIS_GUID;
  if (requester === 'FIN') ParentID = FIN_GUID;

  const requestURL = API_MODULES;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      IsMainModule,
      ParentID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetModuleListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getMainModulesSuccess(data));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getMainModulesError(resp));
      }
    }
  } catch (err) {
    yield put(getMainModulesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get Sub Category Modules request/response handler
 */
export function* getSubCategoryModules() {
  const isGenAdmin = yield select(makeSelectIsGenAdmin());
  let ParentID = MANAGEMENT_GUID;
  if (isGenAdmin) ParentID = GENERAL_GUID;

  const requestURL = API_MODULES;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      ParentID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetModuleListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getSubModulesSuccess(data));
      yield fork(getMainModules);
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getSubModulesError(resp));
      }
    }
  } catch (err) {
    yield put(getSubModulesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Assign Permission to employee request/response handler
 */
export function* getAssignPermission() {
  const empID = yield select(makeSelectEmpID('assign'));

  let requestURL;
  if (empID) requestURL = API_PERMISSIONTEMPLATE + empID;

  const assignData = yield select(makeSelectData('assign'));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: assignData,
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddAndAssignTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getAssignAcessSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAssignAccessError(resp));
      }
    }
  } catch (err) {
    yield put(getAssignAccessError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get the Access Permissions and Time Constraints Refs
 */
export function* getRefs() {
  const timeRequestURL = API_TIMECONSTRAINT;
  const permissionRequestURL = API_PERMISSIONREFS;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const timeRequest = yield call(request, timeRequestURL, options);
    const permissionRequest = yield call(request, permissionRequestURL, options);

    const timeResp = timeRequest.GetTimeConstrListingsResult[0];
    const permissionResp = permissionRequest.GetPermissionListingsResult[0];

    if (timeResp.ResponseCode === 200 && permissionResp.ResponseCode === 200) {
      yield put(getRefsSuccess(permissionResp.ObjectList, timeResp.ObjectList));
    }
    if (timeResp.ErrorCode !== 0) {
      if (timeResp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getRefsError(timeResp));
      }
    }
    if (permissionResp.ErrorCode !== 0) {
      if (permissionResp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getRefsError(permissionResp));
      }
    }
  } catch (err) {
    yield put(getRefsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Remove Template from Employee request/response handler
 */
export function* getRemoveTemplate() {
  const empID = yield select(makeSelectEmpID('remove'));
  const requestURL = API_UNASSIGNPERMISSION + empID;

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
    const resp = apirequest.UnassignAccessPermissionTemplateToEmployeeResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getRemoveTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getRemoveTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getRemoveTemplateError(err));
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

  yield takeLatest(GET_EMPLIST, getEmpList);
  yield takeLatest(GET_EMPLIST_NORESET, getEmpList);
  yield takeLatest(GET_MODULES, getSubCategoryModules);
  yield takeLatest(ASSIGN_ACCESS, getAssignPermission);
  yield takeLatest(GET_REFS, getRefs);
  yield takeLatest(UNASSIGN_TEMPLATE, getRemoveTemplate);
}
