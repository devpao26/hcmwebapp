/**
 * Get our Emp Profile Related Info
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

// Import Request (fetch api)
import request from 'utils/request';

import {
  API_CUSTOMFORMSLIST,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  makeSelectToken,
  makeSelectUsername,
} from 'containers/App/selectors';

import {
  makeSelectPageIndex, makeSelectEmpID, makeSelectSearch,
} from './selectors';

import { CFList } from './constants';

import {
  getCustomFormListSuccess,
  getCustomFormListError,
} from './actions';

let username;
let token;
const pageSize = 20;

/**
 * Retrieve Custom Form List request/response handler
 */
function* getCFORMList() {
  const requestURL = API_CUSTOMFORMSLIST;
  const empID = yield select(makeSelectEmpID());
  const page = yield select(makeSelectPageIndex());
  const search = yield select(makeSelectSearch());

  let Name;
  if (search) Name = search;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
      username,
    },
    body: JSON.stringify({
      SortFilter: {
        PageIndex: page || 1,
        PageSize: pageSize,
        SortBy: 'LastModDate',
        SortExpression: 'DESC',
      },
      CreatedBy: empID,
      Name,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetCustomFormRequestListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getCustomFormListSuccess(data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getCustomFormListError(resp));
      }
    }
  } catch (err) {
    yield put(getCustomFormListError(err));
  }
}

/**
 * CFORM saga manages watcher lifecycle
 */
export default function* CFORMSagas() {
  // Watches for actions and calls the function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(CFList.RETRIEVE, getCFORMList);
  yield takeLatest(CFList.PAGING, getCFORMList);
}
