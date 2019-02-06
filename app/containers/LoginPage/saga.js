/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  API_EMPLOGIN,
  API_EMPPASSWORD,
  EMP_LOGIN,
} from 'containers/App/constants';

import {
  loginSuccess,
  loginError,
  passwordUpdateSuccess,
  passwordUpdateError,
} from './actions';

import { UPDATE_PASSWORD } from './constants';
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectUpdatePasswordOld,
  makeSelectUpdatePasswordNew,
  makeSelectUpdatePasswordEmail,
} from './selectors';

/* eslint quote-props: ["error", "consistent"] */
/**
 * Login request/response handler
 */
export function* getEmpAuthInfo() {
  // Select username and password from store
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  const requestURL = API_EMPLOGIN;

  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username: username,
      Password: password,
    }),
  };
  console.log(headers)
  try {
    // Call our request helper (see 'utils/request')
    const apirequest = yield call(request, requestURL, headers);
    const resp = apirequest.LoginResult[0];
    console.log(resp)
    if (resp.ResponseCode === 200) {
      const userData = resp.ObjectList[0];
      const token = resp.AuthToken;
      const alertCount = resp.ObjectList[0].AlertsNotifsCount.AlertCount;
      const notifCount = resp.ObjectList[0].AlertsNotifsCount.NotifCount;
      // On success, put our retrieved data in our state tree under userData key
      yield put(loginSuccess(userData, token, alertCount, notifCount));
    } else if (resp.ErrorCode !== 0) {
      yield put(loginError(resp));
    }
  } catch (err) {
    // console.log(err); // eslint-disable-line no-console
    yield put(loginError(err));
  }
}

/**
 * Reset Password request/response handle
 */
export function* getUpdatePassword() {
  const email = yield select(makeSelectUpdatePasswordEmail());
  const oldPassword = yield select(makeSelectUpdatePasswordOld());
  const newPassword = yield select(makeSelectUpdatePasswordNew());

  const requestURL = API_EMPPASSWORD;

  const headers = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'OldPassword': oldPassword,
      'Password': newPassword,
      'Username': email,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const apirequest = yield call(request, requestURL, headers);
    const resp = apirequest.ChangeEmpPasswordResult[0];

    if (resp.ResponseCode === 200) {
      // On success, put our retrieved data in our state tree under userData key
      yield put(passwordUpdateSuccess());
    } else if (resp.ErrorCode !== 0) {
      yield put(passwordUpdateError(resp));
    }
  } catch (err) {
    // console.log(err); // eslint-disable-line no-console
    yield put(passwordUpdateError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* empLoginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(EMP_LOGIN, getEmpAuthInfo);
  yield takeLatest(UPDATE_PASSWORD, getUpdatePassword);
}
