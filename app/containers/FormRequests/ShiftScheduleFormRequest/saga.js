/**
 * App Saga
*/

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_EMPLISTS, API_SHIFTTEMPLATES, API_SHIFTSCHEDREQUEST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { EMPLOYEE_LISTS, EMPLOYEE_LISTS_NORESETPAGE, CREATE_SHIFT, SHIFT_LISTS, SHIFT_LISTS_NORESETPAGE } from './constants';

import { showEmployeeListsSuccess, showEmployeeListsError, showShiftListSuccess, showShiftListError, createShiftrequestSuccess, createShiftrequestError } from './action';

import { makeSelectPageIndex, makeSelectSearch, makeSelectRequestDefaultID, makeSelectRequestEmployeeID, makeSelectRequestShiftID, makeSelectRequestDateFrom, makeSelectRequestDateTo, makeSelectRequestAnotherEmp } from './selector';

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
/** Show lists of shift template **/
export function* showShiftListings() {
  const page = yield select(makeSelectPageIndex('shiftlists'));
  const search = yield select(makeSelectSearch('shiftlists'));
  let Name;

  if (page) pageIndex = page;
  if (search) Name = search;

  requestURL = API_SHIFTTEMPLATES;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      SortFilter: {
        PageIndex: pageIndex,
        PageSize: pageSize,
        SortBy: 'Name',
        SortExpression: 'ASC',
      },
      Includes: {
        withShiftSchedule: true,
      },
      Name,
    }),
  };
  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetShiftTemplateListingsResult[0];
    if (resp.ResponseCode === 200) yield put(showShiftListSuccess(resp.ObjectList, resp.PageDetails));

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(showShiftListError(resp));
      }
    }
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Create Shift Schedule Request **/
export function* createShiftScheduleRequest() {
  const ShiftTemplateID = yield select(makeSelectRequestShiftID());
  const RequestDateFrom = yield select(makeSelectRequestDateFrom());
  const RequestDateTo = yield select(makeSelectRequestDateTo());
  const IsRequestOtherEmp = yield select(makeSelectRequestAnotherEmp());

  requestURL = API_SHIFTSCHEDREQUEST;

  let RequestorEmpID;

  if (IsRequestOtherEmp === 0) {
    RequestorEmpID = yield select(makeSelectRequestDefaultID());
  } else {
    RequestorEmpID = yield select(makeSelectRequestEmployeeID());
  }
  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({ RequestorEmpID, ShiftTemplateID, RequestDateFrom, RequestDateTo, IsRequestOtherEmp }),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateShiftScheduleRequestResult[0];
    if (resp.ResponseCode === 200) yield put(createShiftrequestSuccess('Your request has been sent.'));
    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(createShiftrequestError(resp));
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
    takeLatest(SHIFT_LISTS, showShiftListings),
    takeLatest(SHIFT_LISTS_NORESETPAGE, showShiftListings),
    takeLatest(CREATE_SHIFT, createShiftScheduleRequest),
  ];
}
