/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_OTFORMS, API_PR_EMPDTR_INFO } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { CREATE_OTFORMS, RETRIEVE_OTFORMS } from './constants';

import { successOTForms, errorOTForms, retrieveOTFormSuccess } from './action';

import { makeSelectStartDate, makeSelectUserData, makeSelectData } from './selector';


let username; let token;

/** Employees that are not yet enrolled on specific department **/
export function* createOTFormsRequest() {
  const data = yield select(makeSelectData());
  // const OTFrom = yield select(makeSelectStartDate()); // Value from start date should be the same on end date
  // const OTTo = yield select(makeSelectStartDate());
  // const RenderedMinutes = yield select(makeSelectOTMinutes());
  // const Remarks = yield select(makeSelectRemarks());

  const requestURL = API_OTFORMS;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify(data),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateOTRequestResult[0];

    if (resp.ResponseCode === 200) yield put(successOTForms(resp.ResponseCode, 'Your request has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorOTForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Retrieval of OT Request **/
export function* retrieveOTFormsRequest() {
  const userData = yield select(makeSelectUserData());
  const RangeFromDate = yield select(makeSelectStartDate());

  const requestURL = API_PR_EMPDTR_INFO;

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
    const resp = apiRequest.GetDTRListingsResult[0];

    if (resp.ResponseCode === 200) yield put(retrieveOTFormSuccess(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorOTForms(resp.ErrorCode, resp.ErrorMsg));
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
    takeLatest(CREATE_OTFORMS, createOTFormsRequest),
    takeLatest(RETRIEVE_OTFORMS, retrieveOTFormsRequest),
  ];
}
