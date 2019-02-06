/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  API_EMPLISTS,
  API_WORKFORCEACCESS,
} from 'containers/App/constants';
import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';
import { sessionIsExpired } from 'containers/App/actions';

import {
  GET_EMPLIST,
  ENROLL_EMP,
  GET_EMPLIST_NORESET,
} from './constants';

import {
  getEmpListSuccess, getEmpListError,
  getEnrollEmpToAppSuccess, getEnrollEmpToAppError,
} from './actions';

import { makeSelectEmpID, makeSelectPageIndex, makeSelectSearch } from './selector';

let username;
let token;
let pageIndex = 1;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Retrieve Employee List request/response handler
 */
export function* getMasterList() {
  const page = yield select(makeSelectPageIndex('empList'));
  const search = yield select(makeSelectSearch('empList'));

  if (page !== false) {
    pageIndex = page;
  }

  let FirstAndLastName;
  if (search) FirstAndLastName = search;

  // Master list's of all employees
  const requestURL = API_EMPLISTS;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName',
        'SortExpression': 'ASC',
      },
      'Includes': {
        'inShortDetails': true,
        'withAvatar': true,
        'withEmpIDs': true,
        'withWorkGroup': true,
        'withEmploymentStatus': true,
        'withJobRole': true,
        'withComSiteLoc': true,
        'withWorkForceUserFlag': true,
      },
      FirstAndLastName,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
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
 * Enroll Employee to WorkForce Monitoring App request/response handler
 */
export function* enrollEmployee() {
  const requestURL = API_WORKFORCEACCESS;

  const empid = yield select(makeSelectEmpID('enrollEmp'));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify([empid]),
  };

  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, options);
    const resp = apiRequest.EnrollToWorkForceAccessResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getEnrollEmpToAppSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrollEmpToAppError(resp));
      }
    }
  } catch (err) {
    yield put(getEnrollEmpToAppError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* publicRequest() {
  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_EMPLIST, getMasterList);
  yield takeLatest(GET_EMPLIST_NORESET, getMasterList);
  yield takeLatest(ENROLL_EMP, enrollEmployee);
}

