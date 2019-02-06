/**
 * Get our Employee Masterlist
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_PR_EMPTIMEDDEDUCT,
  API_PR_EMPTIMEDEARN,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  EMP_LIST, EMP_TIMEDEARN, EMP_TIMEDDEDUCT,
} from './constants';

import {
  retrievalSuccess,
  retrievalFailed,
  empTimedDeductSuccess,
  empTimedDeductError,
  empTimedEarnSuccess,
  empTimedEarnError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectData,
  makeSelectSearch,
  makeSelectFilter,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Employee Masterlist request/response handler
 */
export function* getEmpList() {
  // Our API URL (from app/constants.js)
  const requestURL = API_EMPLISTS;

  const search = yield select(makeSelectSearch('empList'));
  let FirstAndLastName;
  if (search) {
    FirstAndLastName = search;
  }

  const location = yield select(makeSelectFilter('empList'));
  let ComSiteLocID;
  if (location && location !== 'All') {
    ComSiteLocID = location;
  }

  // Get our Page Index
  const PageIndex = yield select(makeSelectPageIndex('empList'));
  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
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
        'withWorkForceUserFlag': true,
      },
      FirstAndLastName,
      ComSiteLocID,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const objectList = resp.ObjectList;
      const pageDetails = resp.PageDetails;

      // On success, put our retrieved data in our state tree
      yield put(retrievalSuccess(objectList, pageDetails));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalFailed(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievalFailed(err));
  }
}


/**
 * Employee On Spot Deduct request/response handler
 */
export function* getEmpTimedDeduct() {
  const data = yield select(makeSelectData('timedDeduct'));

  const requestURL = API_PR_EMPTIMEDDEDUCT;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddEmpTimedDeductResult[0];

    if (resp.ResponseCode === 200) {
      yield put(empTimedDeductSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(empTimedDeductError(resp));
      }
    }
  } catch (err) {
    yield put(empTimedDeductError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Employee On Spot Earning request/response handler
 */
export function* getEmpTimedEarning() {
  const data = yield select(makeSelectData('timedEarning'));

  const requestURL = API_PR_EMPTIMEDEARN;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddEmpTimedEarnResult[0];

    if (resp.ResponseCode === 200) {
      yield put(empTimedEarnSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(empTimedEarnError(resp));
      }
    }
  } catch (err) {
    yield put(empTimedEarnError(err));
    console.error(err); // eslint-disable-line no-console
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* empListSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  username = yield select(makeSelectUsername());
  token = yield select(makeSelectToken());

  yield takeLatest(EMP_LIST, getEmpList);
  yield takeLatest(EMP_TIMEDDEDUCT, getEmpTimedDeduct);
  yield takeLatest(EMP_TIMEDEARN, getEmpTimedEarning);
}
