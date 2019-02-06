import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { API_EMPLISTS } from 'containers/App/constants';

import {
  sessionIsExpired,
  serverError,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';
import { makeSelectRequestBody } from './selectors';
import { getEmpMasterListSuccess, getEmpMasterListError } from './actions';
import { MasterList } from './constants';

let username;
let token;
/* eslint quote-props: ["error", "consistent"] */
/**
 * Retrieve Emp MasterList
 */
function* getEmpMasterList() {
  const requestURL = API_EMPLISTS;
  const body = yield select(makeSelectRequestBody());

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify(body),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getEmpMasterListSuccess(data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmpMasterListError(resp));
      }
    }
  } catch (err) {
    yield put(serverError(err));
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

  // Get stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(MasterList.RETRIEVE, getEmpMasterList);
  yield takeLatest(MasterList.PAGING, getEmpMasterList);
}
