/**
 * Get our Applicants Data for JO Signing
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_JOSIGNED,
  API_JOSTATCHANGE,
  JO_STATUSPPE,
  JO_STATUSPENDING,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  LIST_JOS,
  CHANGE_JOSTAT,
  SEARCH_FILTER } from './constants';

import {
  retrieveJoSignedListSuccess,
  retrieveJoSignedLisError,
  showHideJoStatSuccess,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectJobId,
  makeSelectJoStatId,
  makeSelectSearchLocation,
  makeSelectSearchValue,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/*
 * JO Signed request/response handler
 */
export function* getJoSigned() {
  // Our API URL (from app/constants.js)
  const requestURL = API_JOSIGNED;

  // Get our Page Index
  // const PageDetails = yield select(makeSelectPageDetails());
  const PageIndex = yield select(makeSelectPageIndex());

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Check if we have search values and location filter value
  const location = yield select(makeSelectSearchLocation());
  let ComSiteLocID;
  if (location) ComSiteLocID = location;

  const value = yield select(makeSelectSearchValue());
  let FirstAndLastName;
  if (value) FirstAndLastName = value;

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
        'SortBy': 'JOCreatedDate', // LastName, Mobile, CreatedDate (Application Date), JOCreatedDate (Signed Date)
        'SortExpression': 'DESC', // ASC or DESC value
      },
      'JOStatusID': JO_STATUSPENDING,
      ComSiteLocID,
      FirstAndLastName,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const joSignedRes = yield call(request, requestURL, options);
    const resp = joSignedRes.GetSignedJOListResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const joObjectList = resp.ObjectList;
      const joPageDetails = resp.PageDetails;

      // On success, put our retrieved data in our state tree
      yield put(retrieveJoSignedListSuccess(joObjectList, joPageDetails));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveJoSignedLisError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrieveJoSignedLisError(err));
  }
}

/*
 * Change Applicant JO Status request/response handler
 */
export function* changeJoStat() {
  const jobId = yield select(makeSelectJobId());
  const joStatId = yield select(makeSelectJoStatId());

  // Our API URL (from app/constants.js)
  const requestURL = API_JOSTATCHANGE + jobId;

  // Declare our headers defaults
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'JOStatusID': joStatId,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const jostatRes = yield call(request, requestURL, options);

    // Assign our response ObjectList and PageDetails in variable
    const resp = jostatRes.UpdateProfileJOStatusResult[0];

    if (resp.ResponseCode === 200) {
      if (joStatId === JO_STATUSPPE) {
        yield put(showHideJoStatSuccess(true, 'PPE'));
        // Change the value of 'redirect' in our state
        // yield put(redirectToPpe());
      } else {
        // Show our success notification
        yield put(showHideJoStatSuccess(true, 'Others'));
      }
    }
  } catch (err) {
    // will catch an api error (not ResponseCode and ErrorCode)
    console.error(err); // eslint-disable-line no-console
    yield put(retrieveJoSignedLisError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* onBoardingSagas() {
  // Watches for actions and calls their function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(LIST_JOS, getJoSigned);
  yield takeLatest(CHANGE_JOSTAT, changeJoStat);
  yield takeLatest(SEARCH_FILTER, getJoSigned);
}
