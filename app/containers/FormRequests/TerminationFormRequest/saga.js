/**
 * App Saga
*/

import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

import { API_EMPLISTS, API_TERMINATIONREQUEST, API_UPLOADFILE } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { EMPLOYEE_LISTS, EMPLOYEE_LISTS_NORESETPAGE, CREATE_FORM } from './constants';

import { showEmployeeListsSuccess, showEmployeeListsError, createFormRequestSuccess, createFormRequestError } from './action';

import { makeSelectPageIndex, makeSelectSearch, makeSelectEmployeeID, makeSelectNote, makeSelectAttachments } from './selector';

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
/**
 * Check send request if we have files to upload,
 * then pass the specific saga to handle the request
 */
let uploadedFileResponse = false;

/**
 * Upload File(s) request/handler
*/
export function* getUploadFile() {
  const files = yield select(makeSelectAttachments());

  requestURL = API_UPLOADFILE;

  const fileData = new FormData();

  Object.keys(files).forEach((i) => {
    fileData.append('files', files[i]);
  });

  fileData.append('folderType', 'empportal');

  const options = { method: 'POST', credentials: 'same-origin', body: fileData };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest.response.success === true) {
      yield uploadedFileResponse = apirequest.response;
      yield fork(getCreateRequest);
    }
  } catch (err) {
    yield put(serverError());
  }
}
/**
 * Create Leave Request request/response handler
 */
export function* getCreateRequest() {
  const RequestorEmpID = yield select(makeSelectEmployeeID());
  const Reason = yield select(makeSelectNote());

  requestURL = API_TERMINATIONREQUEST;

  const attachList = [];
  if (uploadedFileResponse !== false) {
    const file = uploadedFileResponse.uploadedFiles;
    const epoch = uploadedFileResponse.dteCreated;

    for (const i of file) {
      const filename = i.filename;
      const ext = filename.split('.').pop();

      attachList.push({
        Epoch: epoch,
        FileType: ext,
        FileName: filename,
        Path: i.previewURI,
        Size: i.size,
      });
    }
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token, username },
    body: JSON.stringify({
      RequestorEmpID,
      Reason,
      TerminationAttachList: attachList,
    }),
  };
  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.CreateTerminationRequestResult[0];
    if (resp.ResponseCode === 200) yield put(createFormRequestSuccess('Notice has been sent.'));

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
    takeLatest(CREATE_FORM, getUploadFile),
  ];
}
