/**
 * Transfer Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_TEAMLIST,
  API_DEPARTMENTLIST,
  API_MOVEMEMBERS,
} from 'containers/App/constants';

import {
  sessionIsExpired,
  // apiServerError,
  accessDenied,
} from 'containers/App/actions';

import {
  makeSelectUsername,
  makeSelectToken,
} from 'containers/App/selectors';

import {
  GET_TRANSFERLIST,
  GET_TRANSFERLIST_NORESET,
} from './constants';

import {
  getTransferListSuccess,
  getTransferListError,
} from './actions';

import {
  makeSelectID,
  makeSelectIsTeam,
  makeSelectPageIndex,
  makeSelectSearch,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Transfer List request/response handler
 */
export function* getTransferList() {
  const id = yield select(makeSelectID('transferList'));
  const isTeam = yield select(makeSelectIsTeam('transferList'));
  const page = yield select(makeSelectPageIndex('transferList'));
  const search = yield select(makeSelectSearch('transferList'));
  console.log(id, isTeam, page, search);
  if (page) pageIndex = page;

  let Name;
  let TeamName;
  if (search && (!isTeam && !id)) Name = search;
  if (search && (isTeam || (!isTeam && id))) TeamName = search;

  let requestURL;
  if (isTeam || (!isTeam && id)) requestURL = API_TEAMLIST;
  if (!isTeam && !id) requestURL = API_DEPARTMENTLIST;

  let ParentID;
  let DeptID;
  let HierarchyLvl;
  if (isTeam) ParentID = id;
  if (!isTeam && id) {
    DeptID = id;
    HierarchyLvl = 0;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': pageSize,
        'PageIndex': pageIndex,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      TeamName,
      Name,
      ParentID,
      DeptID,
      HierarchyLvl,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isTeam || (!isTeam && id)) resp = apirequest.GetTeamsOnlyResult[0];
    if (!isTeam && !id) resp = apirequest.GetDepartmentResult[0];
    console.log(resp);

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getTransferListSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else if (resp.ErrorCode === 403) {
        yield put(accessDenied(true));
      } else {
        yield put(getTransferListError(resp));
      }
    }
  } catch (err) {
    yield put(getTransferListError(err));
    // yield put(apiServerError());
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

  yield takeLatest(GET_TRANSFERLIST, getTransferList);
  yield takeLatest(GET_TRANSFERLIST_NORESET, getTransferList);
}
