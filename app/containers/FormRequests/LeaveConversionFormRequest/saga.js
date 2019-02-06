/**
 * Asynchronous Requests
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import { API_LCFREQUEST, API_LCFREQUESTLIST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { CREATE_LCFFORMS, SHOW_LCFREFSFORMS } from './constants';

import { successLCFRequest, errorLCFRequest, showLCFRefSuccess } from './action';

import { makeSelectDate } from './selector';

let username; let token; let requestURL;

/** Create Leave Conversion Request **/
export function* createLCFRequest() {
  const DateRequested = yield select(makeSelectDate());

  requestURL = API_LCFREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({ DateRequested }),
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateLCFRequestResult[0];
    if (resp.ResponseCode === 200) yield put(successLCFRequest(resp.ResponseCode, 'Your request has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorLCFRequest(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Show Leave Conversion Referrences **/
export function* showLCFRequest() {
  requestURL = API_LCFREQUESTLIST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetLCFRequestListingsResult[0];
    
    if (resp.ResponseCode === 200) yield put(showLCFRefSuccess(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorLCFRequest(resp.ErrorCode, resp.ErrorMsg));
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
    takeLatest(CREATE_LCFFORMS, createLCFRequest),
    takeLatest(SHOW_LCFREFSFORMS, showLCFRequest),
  ];
}
