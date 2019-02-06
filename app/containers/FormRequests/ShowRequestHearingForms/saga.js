/**
 * App Saga
*/

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_EMPLISTS, API_WORKFLOWFORMLOAD, API_SHFREQUEST, API_SCMREQUESTLIST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { EMPLOYEE_LISTS, EMPLOYEE_LISTS_NORESETPAGE, GET_WORKFLOWREFS, CREATE_FORM, GET_APPROVEDSCMREFS } from './constants';

import { showEmployeeListsSuccess, showEmployeeListsError, successWorkflowReferrences, errorWorkflowReferrences, createFormRequestSuccess, createFormRequestError, successApprovedReferrences, errorApprovedReferrences } from './action';

import { makeSelectPageIndex, makeSelectSearch, makeSelectEmployeeID, makeSelectViolation, makeSelectDateOfHearing, makeSelectSCMRequestID, makeSelectHearingLocationID, makeSelectEmployee, makeSelectEmpProfileID } from './selector';

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
      Includes: {
        isShortDetails: true,
        withAvatar: true,
        withEmpIDs: true,
        withJobRole: true,
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
/** Retrieval for workflow referrences **/
export function* retrieveWorkFlowRefs() {
  requestURL = API_WORKFLOWFORMLOAD;

  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetWorkFlowFormListRefsResult[0];

    if (resp.ResponseCode === 200) yield put(successWorkflowReferrences(resp.ObjectList));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorWorkflowReferrences(resp));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Retrieval for approved referrences **/
export function* retrieveApprovedRefs() {
  const page = yield select(makeSelectPageIndex('approvedrefs'));
  const search = yield select(makeSelectSearch('approvedrefs'));

  let FirstAndLastName;

  if (page) pageIndex = page;
  if (search) FirstAndLastName = search;

  const EmpIDInQuestion = yield select(makeSelectEmpProfileID());

  requestURL = API_SCMREQUESTLIST;

  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify({
      FirstAndLastName,
      EmpIDInQuestion,
    }),
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetSCMRequestListingsResult[0];

    if (resp.ResponseCode === 200) yield put(successApprovedReferrences(resp.ObjectList));

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(errorApprovedReferrences(resp));
      }
    }
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Create Form Request **/
export function* createFormRequest() {
  const EmpIDInQuestion = yield select(makeSelectEmployeeID());
  const Violation = yield select(makeSelectViolation());
  const HearingDate = yield select(makeSelectDateOfHearing());
  const SCMRequestID = yield select(makeSelectSCMRequestID());
  const HearingLocID = yield select(makeSelectHearingLocationID());
  const employeeIDs = yield select(makeSelectEmployee());
  
  let arr = employeeIDs;

  arr = arr.map((item) => {
    return { EmpProfileID: item };
  });

  requestURL = API_SHFREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      EmpIDInQuestion,
      Violation,
      HearingDate,
      SCMRequestID,
      HearingLocID,
      HearingRequestCommitteeList: arr,
    }),
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateHearingRequestResult[0];
    if (resp.ResponseCode === 200) yield put(createFormRequestSuccess('Hearing Notice has been sent.'));
    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(createFormRequestError(resp));
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
    takeLatest(GET_WORKFLOWREFS, retrieveWorkFlowRefs),
    takeLatest(GET_APPROVEDSCMREFS, retrieveApprovedRefs),
    takeLatest(CREATE_FORM, createFormRequest),
  ];
}
