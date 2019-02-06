/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import { API_COEREQUEST, API_WORKFLOWFORMLOAD } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { CREATE_COEFORMS, RETRIEVE_COETYPELISTS } from './constants';

import { retrieveOTFormSuccess, successCOEForms, errorCOEForms } from './action';

import { makeShowDescription, makeShowTypeID, makeCustomInputType } from './selector';

let username; let token; let requestURL;

/** Create COE Request **/
export function* createCOEFormsRequest() {
  const COETypeID = yield select(makeShowTypeID());
  const Reason = yield select(makeShowDescription());
  const COEUsageType = yield select(makeCustomInputType());

  requestURL = API_COEREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({ COETypeID, Reason, COEUsageType }),
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateCOERequestResult[0];

    if (resp.ResponseCode === 200) yield put(successCOEForms(resp.ResponseCode, 'Your request has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorCOEForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Retrieve COE type lists referrences **/
export function* retrieveCOEFormsTypeLists() {
  requestURL = API_WORKFLOWFORMLOAD;

  const headers = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', username, token },
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetWorkFlowFormListRefsResult[0];

    if (resp.ResponseCode === 200) yield put(retrieveOTFormSuccess(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorCOEForms(resp.ErrorCode, resp.ErrorMsg));
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
    takeLatest(CREATE_COEFORMS, createCOEFormsRequest),
    takeLatest(RETRIEVE_COETYPELISTS, retrieveCOEFormsTypeLists),
  ];
}
