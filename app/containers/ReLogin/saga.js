/**
 * Relogin Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_EMPLOGIN,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  makeSelectReloginUsername,
  makeSelectReloginPassword,
} from './selectors';

import { submitReloginError, submitReloginSuccess } from './actions';
import { SUBMIT_RELOGIN } from './constants';

/* eslint quote-props: ["error", "consistent"] */
/**
 * Submit ReLogin credentials
 */
export function* submitRelogin() {
  const requestURL = API_EMPLOGIN;

  const Username = yield select(makeSelectReloginUsername());
  const Password = yield select(makeSelectReloginPassword());

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username,
      Password,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.LoginResult[0];

    if (resp.ResponseCode === 200) {
      yield put(submitReloginSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(submitReloginError(resp));
      }
    }
  } catch (err) {
    yield put(submitReloginError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* reloginSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(SUBMIT_RELOGIN, submitRelogin);
}
