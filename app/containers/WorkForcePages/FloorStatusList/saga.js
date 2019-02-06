/**
 * Get our Employee Masterlist
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_TEAMLIST,
  API_REPORT_WF_DTR,
  EMP_STATUS_ACTIVE,
  EMP_STATUS_SUSPENDED } from 'containers/App/constants';

import { sessionIsExpired } from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  EMP_LIST,
  SEARCH_FILTER,
  GET_TEAMS,
  REQUEST_DTR,
} from './constants';

import {
  retrievalSuccess,
  retrievalFailed,
  retrieveTeamListSuccess,
  retrieveTeamListError,
  dtrExportSuccess,
  dtrExportError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearchValue,
  makeSelectDtrDate,
  makeSelectDtrTeamId,
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
  const PageIndex = yield select(makeSelectPageIndex());
  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Check if we have search value
  // If it exists include it on the pagination and api request
  const value = yield select(makeSelectSearchValue());
  let FirstAndLastName;
  if (value !== false) FirstAndLastName = value;

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
        'SortBy': 'LastName', // LastName, Mobile, CreatedDate (Application Date)
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withWorkGroup': true,
        'withJobRole': true,
        'withComSiteLoc': true,
      },
      FirstAndLastName,
      'EnrolledInWorkForce': 'true',
      'EmpStatusID': [
        EMP_STATUS_ACTIVE,
        EMP_STATUS_SUSPENDED,
      ],
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

      yield delay(700);
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
    yield put(retrievalFailed(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Retrieve Team List for DTR Exporting request/response handler
 */
export function* getTeamList() {
  const requestURL = API_TEAMLIST;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': 1000,
      },
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetTeamsOnlyResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield delay(500);
      yield put(retrieveTeamListSuccess(data));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveTeamListError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveTeamListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * DTR Export request/response handler
 */
export function* getDtrExport() {
  const date = yield select(makeSelectDtrDate());
  const teamId = yield select(makeSelectDtrTeamId());
  const requestURL = API_REPORT_WF_DTR;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'DateFrom': date,
      'TeamID': teamId,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.ExportWFAMResult[0];
    if (resp.ResponseCode === 200) {
      const uri = resp.ObjectList[0];
      yield put(dtrExportSuccess(uri));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(dtrExportError(resp));
      }
    }
  } catch (err) {
    yield put(dtrExportError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* floorStatusListSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(EMP_LIST, getEmpList);
  yield takeLatest(SEARCH_FILTER, getEmpList);
  yield takeLatest(GET_TEAMS, getTeamList);
  yield takeLatest(REQUEST_DTR, getDtrExport);
}
