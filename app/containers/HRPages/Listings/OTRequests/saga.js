/**
 * Forms Approval Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  API_RETRIEVEOTLIST,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  RequestList,
} from './constants';

import {
  getRequestListsSuccess,
  getRequestListsError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearchValue,
  makeSelectFilterValue,
} from './selectors';

// Initialize username, token and pageSize
let username;
let token;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Leave Request List request/response handler
 */
export function* getRequestList() {
  // Get Search value
  const search = yield select(makeSelectSearchValue('formLists'));
  let RequestorName;
  if (search) {
    RequestorName = search;
  }

  // Get Filter Value
  const filter = yield select(makeSelectFilterValue('formLists'));

  let FormRequestStatusID;
  if (filter) FormRequestStatusID = filter;

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('formLists'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // API URL (from app/constants.js)
  const requestURL = API_RETRIEVEOTLIST;

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
        'SortBy': 'LastModDate',
        'SortExpression': 'DESC',
      },
      RequestorName,
      FormRequestStatusID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetOTRequestListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield put(getRequestListsSuccess(data, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else if (resp.ErrorCode === 204) {
        yield put(getRequestListsError(resp));
      } else {
        yield put(getRequestListsError(resp));
      }
    }
  } catch (err) {
    yield put(getRequestListsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* formRequestsSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  // actions
  yield takeLatest(RequestList.RETRIEVE, getRequestList);
  yield takeLatest(RequestList.PAGING, getRequestList);
}
