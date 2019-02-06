import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  API_LEAVEREQLIST,
  API_EMPLEAVECOUNT,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  getEmpLeaveReqListSuccess,
  getEmpLeaveReqListError,
  updateLeaveSuccess,
  updateLeavesError,
} from './actions';

import { LeaveList, SET_LEAVES } from './constants';
import {
  makeSelectEmpID,
  makeSelectPageIndex,
  makeSelectLeavesData,
  makeSelectFilter,
  makeSelectSearch,
} from './selectors';

// Initialize username, token and pageSize
let username;
let token;
let pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Leave Request List request/response handler
 */
export function* getLeaveReqList() {
  // Get employee id
  const empID = yield select(makeSelectEmpID());
  const search = yield select(makeSelectSearch('empLeaves'));
  let RequestorName;
  if (search) RequestorName = search;

  // Get Page Index
  const page = yield select(makeSelectPageIndex('empLeaves'));

  // Get if we have a filter
  const filter = yield select(makeSelectFilter('empLeaves'));

  let FormRequestStatusID;
  if (filter) FormRequestStatusID = filter;

  // Change the page size for this list only
  pageSize = 5;

  // API URL (from app/constants.js)
  const requestURL = API_LEAVEREQLIST;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': page || 1,
        'PageSize': pageSize,
      },
      'CreatedBy': empID,
      RequestorName,
      FormRequestStatusID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetLeaveRequestListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getEmpLeaveReqListSuccess(data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmpLeaveReqListError(resp));
      }
    }
  } catch (err) {
    yield put(getEmpLeaveReqListError(err));
  }
}

/**
 * Update Employe Leave Credits
 */
export function* getEmpLeaveCredits() {
  // Get employee id
  const empID = yield select(makeSelectEmpID());

  // Get leaves data
  const leavesData = yield select(makeSelectLeavesData());

  const requestURL = API_EMPLEAVECOUNT + empID;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(leavesData),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateEmpLeaveCountResult[0];

    if (resp.ResponseCode === 200) {
      yield put(updateLeaveSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(updateLeavesError(resp));
      }
    }
  } catch (err) {
    yield put(updateLeavesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* empProfileSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(LeaveList.RETRIEVE, getLeaveReqList);
  yield takeLatest(LeaveList.PAGING, getLeaveReqList);
  yield takeLatest(SET_LEAVES, getEmpLeaveCredits);
}
