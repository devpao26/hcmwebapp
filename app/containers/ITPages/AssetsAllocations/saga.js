/**
 * App sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_ASSETSLISTS,
  API_EMPLISTS,
} from 'containers/App/constants';

import {
  sessionIsExpired,
  serverError,
} from 'containers/App/actions';

import {
  makeSelectUsername,
  makeSelectToken,
} from 'containers/App/selectors';

import {
  GET_ASSETSLIST,
  GET_ASSETSLIST_NORESET,
  GET_EMPLIST,
  GET_EMPLIST_NORESET,
} from './constants';

import {
  getAssetListSuccess,
  getAssetListError,
  getEmpListSuccess,
  getEmpListError,
} from './actions';

import {
  makeSelectSearch,
  makeSelectPageIndex,
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
    yield put(serverError(err));
  }
}

export function* getList() {
  const requestURL = API_ASSETSLISTS;

  const page = yield select(makeSelectPageIndex('assetList'));
  if (page) pageIndex = page;

  const search = yield select(makeSelectSearch('assetList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    // body: JSON.stringify({
    //   'SortFilter': {
    //     'PageSize': pageSize,
    //     'PageIndex': pageIndex,
    //     'SortBy': 'LastName',
    //     'SortExpression': 'DESC',
    //   },
    //   FirstAndLastName,
    // }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetAssetListingsResult[0];
    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getAssetListSuccess(data, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAssetListError(resp));
      }
    }
  } catch (err) {
    yield put(serverError(err));
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

  yield takeLatest(GET_ASSETSLIST, getList);
  yield takeLatest(GET_ASSETSLIST_NORESET, getList);
  yield takeLatest(GET_EMPLIST, getEmpList);
  yield takeLatest(GET_EMPLIST_NORESET, getEmpList);
}
