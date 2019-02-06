/**
 * Get our Employee Masterlist
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  API_EMPLISTS,
  API_EMPLEAVECOUNT,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  GET_EMPLIST,
  GET_EMPSEARCH,
  SET_LEAVES,
} from './constants';

import {
  retrievalEmpListSuccess,
  retrievalEmpListFailed,
  updateLeaveSuccess,
  updateLeavesError,
} from './actions';

import {
  makeSelectPageIndex, makeSelectSearch,
  makeSelectData, makeSelectEmpID,
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

  // Get our Page Index
  const PageIndex = yield select(makeSelectPageIndex('empList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  const search = yield select(makeSelectSearch('empList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

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
        // 'isShortDetails': true,
        'withAvatar': true,
        'withEmpIDs': true,
        'withWorkGroup': true,
        'withEmploymentStatus': true,
        'withJobRole': true,
        'withEmpLeaves': true,
      },
      FirstAndLastName,
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

      yield delay(500);
      // On success, put our retrieved data in our state tree
      yield put(retrievalEmpListSuccess(objectList, pageDetails));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalEmpListFailed(resp));
      }
    }
  } catch (err) {
    yield put(retrievalEmpListFailed(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Update Employe Leave Credits
 */
export function* getEmpLeaveCredits() {
  // Get employee id
  const empID = yield select(makeSelectEmpID());

  // Get leaves data
  const leavesData = yield select(makeSelectData('updateLeaves'));

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
export default function* empListSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_EMPLIST, getEmpList);
  yield takeLatest(GET_EMPSEARCH, getEmpList);
  yield takeLatest(SET_LEAVES, getEmpLeaveCredits);
}
