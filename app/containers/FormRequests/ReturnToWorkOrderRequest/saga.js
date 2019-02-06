/**
 * App Saga
*/

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_WORKFLOWFORMLOAD, API_EMPLISTS, API_RTWOREQUEST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { EMPLOYEE_LISTS, EMPLOYEE_LISTS_NORESETPAGE, RTWO_REFERRENCES, CREATE_RTWO } from './constants';

import { showEmployeeListsSuccess, showEmployeeListsError, RTWOReferrencesSuccess, RTWOReferrencesError, createRTWOrequestSuccess, createRTWOrequestError } from './action';

import { makeSelectPageIndex, makeSelectSearch, makeSelectEmployeeID, makeSelectRTWOTypeId, makeSelectReason, makeSelectRequestDate, makeSelectRequestTime } from './selector';

let username; let token; let pageIndex = 1; let requestURL;
const pageSize = 20;

/** Show lists of employees **/
export function* showEmployeeListings() {
  const page = yield select(makeSelectPageIndex('employeelists'));
  const search = yield select(makeSelectSearch('employeelists'));
  let FirstAndLastName;

  if (page) pageIndex = page;
  if (search) FirstAndLastName = search;

  requestURL = API_EMPLISTS;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      SortFilter: {
        PageIndex: pageIndex,
        PageSize: pageSize,
        SortBy: 'LastName',
        SortExpression: 'ASC',
      },
      FirstAndLastName,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) yield put(showEmployeeListsSuccess(resp.ObjectList, resp.PageDetails));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(showEmployeeListsError(resp));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Show RTWO forms referrences **/
export function* retrieveRTWOReferrences() {
  requestURL = API_WORKFLOWFORMLOAD;

  const headers = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', username, token },
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetWorkFlowFormListRefsResult[0];
    if (resp.ResponseCode === 200) yield put(RTWOReferrencesSuccess(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(RTWOReferrencesError(resp));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Create RTWO requests **/
export function* createReturnToWorkOrder() {
  const EmpProfileID = yield select(makeSelectEmployeeID());
  const RTWOReasonID = yield select(makeSelectRTWOTypeId());
  const Reason = yield select(makeSelectReason());
  const time = yield select(makeSelectRequestTime());
  const date = yield select(makeSelectRequestDate());

  requestURL = API_RTWOREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({ EmpProfileID, RTWOReasonID, Reason, ActivationDate: `${time} ${date}` }),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateRTWORequestResult[0];
    if (resp.ResponseCode === 200) yield put(createRTWOrequestSuccess('Your request has been sent.'));
    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(createRTWOrequestError(resp));
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
    takeLatest(EMPLOYEE_LISTS, showEmployeeListings),
    takeLatest(EMPLOYEE_LISTS_NORESETPAGE, showEmployeeListings),
    takeLatest(RTWO_REFERRENCES, retrieveRTWOReferrences),
    takeLatest(CREATE_RTWO, createReturnToWorkOrder),
  ];
}
