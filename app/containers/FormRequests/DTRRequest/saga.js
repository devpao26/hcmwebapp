/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_DTRREQUEST, API_DTRREQUESTLIST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { CREATE_FORMS, RETRIEVE_FORMS } from './constants';

import { successForms, errorForms, retrieveFormSuccess } from './action';

import { makeSelectStartDate, makeSelectUserData, makeSelectData } from './selector';


let username; let token;

/** Employees that are not yet enrolled on specific department **/
export function* createFormsRequest() {
  const data = yield select(makeSelectData());

  const requestURL = API_DTRREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify(data),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateDTRReconcileRequestResult[0];

    if (resp.ResponseCode === 200) yield put(successForms(resp.ResponseCode, 'Your request has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Retrieval of List **/
export function* retrieveFormsRequest() {
  const userData = yield select(makeSelectUserData());
  const RangeFromDate = yield select(makeSelectStartDate());

  const requestURL = API_DTRREQUESTLIST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      EmpProfileID: userData.EmpProfileID,
      RangeFromDate,
    }),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.DTRReconciliationRequestList[0];

    if (resp.ResponseCode === 200) yield put(retrieveFormSuccess(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/**
* Root saga manages watcher lifecycle
*/
export default function* rootSaga() {
  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield [
    takeLatest(CREATE_FORMS, createFormsRequest),
    takeLatest(RETRIEVE_FORMS, retrieveFormsRequest),
  ];
}
