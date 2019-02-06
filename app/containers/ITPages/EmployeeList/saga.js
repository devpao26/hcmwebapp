/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_EMPFORMREFS,
  API_EMPACCESSFORM,
  API_EMPPROFILE,
  API_EMPSENDNEWPASSWORD,
  EMP_STATUS_NEW,
} from 'containers/App/constants';

import { sessionIsExpired } from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  GET_EMPLIST,
  GET_EMPLIST_SEARCH,
  CHANGE_STATUS,
  SEND_NEWPASS,
  GET_REFS,
  UPDATE_EMPEMAIL,
} from './constants';

import {
  getEmpListSuccess,
  getEmpListError,
  getChangeStatusError,
  getChangeStatusSuccess,
  getSendNewPassSuccess,
  getSendNewPassError,
  getRefsSuccess,
  getRefsError,
  getUpdateEmailSuccess,
  getUpdateEmailError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectEmpID,
  makeSelectEmail,
  makeSelectStatus,
} from './selector';

let token;
let username;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Retrieve Employee List request/response handler
 */
export function* getEmployeeList() {
  // Master list's of all employees
  const requestURL = API_EMPLISTS;

  const search = yield select(makeSelectSearch('empList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

  const PageIndex = yield select(makeSelectPageIndex('empList'));
  if (PageIndex) pageIndex = PageIndex;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName',
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withEmpIDs': true,
        'withWorkGroup': true,
        'withEmploymentStatus': true,
        'withJobRole': true,
        'withComSiteLoc': true,
      },
      FirstAndLastName,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, options);
    const resp = apiRequest.GetEmpProfilesResult[0];

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
  }
}

// Getting Employees Referrences List
export function* getReferenceList() {
  const requestURL = API_EMPFORMREFS;

  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.EmpFormLoadResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getRefsSuccess(resp.ObjectList[0].EmpStatusRefs));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getRefsError(resp));
      }
    }
  } catch (err) {
    yield put(getRefsError(err));
  }
}

/**
 * Send New Password request/response handler
 */
export function* getSendNewPassword() {
  const empID = yield select(makeSelectEmpID('newPass'));

  const requestURL = API_EMPSENDNEWPASSWORD + empID;

  const headers = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.SendNewPasswordResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getSendNewPassSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getSendNewPassError(resp));
      }
    }
  } catch (err) {
    yield put(getSendNewPassError(err));
  }
}

/**
 * Create Access Form / Change Status request/response handler
 */
export function* getChangeStatus() {
  const email = yield select(makeSelectEmail('changeStatus'));
  const empID = yield select(makeSelectEmpID('changeStatus'));
  const statusID = yield select(makeSelectStatus('changeStatus'));

  let requestURL;
  let method;

  let Email;
  let EmpStatusID;
  if (statusID === EMP_STATUS_NEW) {
    requestURL = API_EMPACCESSFORM + empID;
    method = 'POST';
    Email = email;
  } else {
    requestURL = API_EMPPROFILE + empID;
    method = 'PUT';
    EmpStatusID = statusID;
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify({
      Email,
      EmpStatusID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (statusID === EMP_STATUS_NEW) {
      resp = apirequest.CreateEmpUserAccountResult[0];
    } else {
      resp = apirequest.UpdateEmpProfileResult[0];
    }

    if (resp.ResponseCode === 200) {
      yield put(getChangeStatusSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getChangeStatusError(resp));
      }
    }
  } catch (err) {
    yield put(getChangeStatusError(err));
  }
}

/**
 * Updating of Employees Email
 */
export function* getUpdateEmail() {
  const email = yield select(makeSelectEmail('updateEmail'));
  const empID = yield select(makeSelectEmpID('updateEmail'));

  const requestURL = API_EMPPROFILE + empID;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify({
      Email: email,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateEmpProfileResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUpdateEmailSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUpdateEmailError(resp));
      }
    }
  } catch (err) {
    yield put(getUpdateEmailError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_EMPLIST, getEmployeeList);
  yield takeLatest(GET_EMPLIST_SEARCH, getEmployeeList);
  yield takeLatest(GET_REFS, getReferenceList);
  yield takeLatest(CHANGE_STATUS, getChangeStatus);
  yield takeLatest(SEND_NEWPASS, getSendNewPassword);
  yield takeLatest(UPDATE_EMPEMAIL, getUpdateEmail);
}

