/**
 * Asynchrounous Requests
 */
import {
 call,
 put,
 select,
 takeLatest,
 fork,
}
from 'redux-saga/effects';

import { API_WORKFLOWFORMLOAD, API_IRFREQUEST, API_UPLOADFILE, API_EMPLISTS } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { EMPLOYEE_LISTS, SEARCH_QUERY, CREATE_IRFREQUESTS, IRF_REFERRENCES } from './constants';

import { showEmployeeListsSuccess, successIRFReferrences, successIRFForms, errorIRFForms, searchError } from './action';

import {
  makeSelectPageIndex, makeUserSearchLists, makeSelectIRFtypeid,
  makeSelectRequestorEmpID, makeSelectReason, makeSelectRequesttime,
  makeSelectRequestlocation, makeSelectRequestdate, makeSelectAttachmentFiles,
} from './selector';

let username; let token;
let pageIndex = 1; let requestURL;

const paramsRequest = {
  Includes: {
    isShortDetails: true,
    withAvatar: true,
    withEmpIDs: true,
  },
};
/** Show list of employees **/
export function* showEmployeeListings() {
  const PageIndex = yield select(makeSelectPageIndex());

  pageIndex = 1;
  if (PageIndex !== false) pageIndex = PageIndex;

  requestURL = API_EMPLISTS;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      SortFilter: {
        PageIndex: pageIndex,
        PageSize: 20,
        SortBy: 'LastName',
        SortExpression: 'ASC',
      },
      paramsRequest,
    }),
  };

  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetEmpProfilesResult[0];
    if (resp.ResponseCode === 200) yield put(showEmployeeListsSuccess(resp.ObjectList, resp.PageDetails));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorIRFForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Search listings employees **/
export function* searchQuery() {
  const FirstAndLastName = yield select(makeUserSearchLists());

  requestURL = API_EMPLISTS;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({ FirstAndLastName, paramsRequest }),
  };
  try {
    // Call our request helper (see 'utils/request')
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) yield put(showEmployeeListsSuccess(resp.ObjectList, resp.PageDetails));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(searchError('No Results Found'));
  } catch (err) {
    yield put(serverError(err));
  }
}
/**
 * Check send request if we have files to upload,
 * then pass the specific saga to handle the request
 */
/**
 * Upload File(s) request/handler
 */
let uploadedFileResponse = false;
export function* getUploadFile() {
  const files = yield select(makeSelectAttachmentFiles());
  requestURL = API_UPLOADFILE;

  const fileData = new FormData();
  Object.keys(files).forEach((i) => {
    fileData.append('files', files[i]);
  });
  fileData.append('folderType', 'empportal');

  const options = {
    method: 'POST',
    credentials: 'same-origin',
    body: fileData,
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest.response.success === true) yield uploadedFileResponse = apirequest.response; yield fork(getCreateRequest);
  } catch (err) {
    yield put(serverError(err));
  }
}
/**
 * Create Request request/response handler
 */
export function* getCreateRequest() {
  // Retrieve create data
  const IRFTypeID = yield select(makeSelectIRFtypeid());
  const RequestorEmpID = yield select(makeSelectRequestorEmpID());
  const Reason = yield select(makeSelectReason());
  const RequestDate = yield select(makeSelectRequestdate());
  const RequestTime = yield select(makeSelectRequesttime());
  const RequestLocation = yield select(makeSelectRequestlocation());

  requestURL = API_IRFREQUEST;

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
    body: JSON.stringify({ IRFTypeID, RequestorEmpID, Reason, RequestDate, RequestTime, RequestLocation, IRFRequestAttachList: attachList }),
  };
  
  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.CreateIRFRequestResult[0];
    if (resp.ResponseCode === 200) yield put(successIRFForms(resp.ResponseCode, 'Your report has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorIRFForms(resp.ErrorCode, resp.ErrorMsg));
  } catch (err) {
    yield put(serverError(err));
  }
}
/** Retrieve irf forms referrences **/
export function* retrieveIRFReferrences() {
  requestURL = API_WORKFLOWFORMLOAD;

  const headers = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', username, token },
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetWorkFlowFormListRefsResult[0];
    console.log(resp)
    if (resp.ResponseCode === 200) yield put(successIRFReferrences(resp.ObjectList));

    if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorIRFForms(resp.ErrorCode, resp.ErrorMsg));
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
    takeLatest(SEARCH_QUERY, searchQuery),
    takeLatest(CREATE_IRFREQUESTS, getUploadFile),
    takeLatest(IRF_REFERRENCES, retrieveIRFReferrences),
  ];
}
