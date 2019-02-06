/**
 * Asynchronous Request
 */

import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

import request from 'utils/request';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import { API_WORKFLOWFORMLIST, API_CUSTOMFORMS, API_UPLOADFILE } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { CREATE_CUSTOMFORMS, RETRIEVE_CUSTOMFORMS } from './constants';

import { successCustomForms, retrieveSuccessCustomFormsReferrences, errorCustomForms, retrieveErrorCustomFormsReferrences } from './action';

import { makeSelectCustomFormId, makeSelectAttachmentFiles, makeSelectReasons } from './selector';

let username; let token;

/**
 * Check send request if we have files to upload,
 * then pass the specific saga to handle the request
 */
let uploadedFileResponse = false;

/**
 * Upload File(s) request/handler
*/
export function* getUploadFile() {
  const files = yield select(makeSelectAttachmentFiles());

  const requestURL = API_UPLOADFILE;

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
  const Remarks = yield select(makeSelectReasons());
  const WorkFlowFormID = yield select(makeSelectCustomFormId());

  const requestURL = API_CUSTOMFORMS;

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
      WorkFlowFormID,
      Remarks,
      CustomFormRequestAttachList: attachList,
    }),
  };
  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.CreateCustomFormRequestResult[0];

    if (resp.ResponseCode === 200) yield put(successCustomForms(resp.ResponseCode, 'Your Request has been sent.'));

    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(errorCustomForms(resp.ErrorCode, "There's no Workflow associated to your request yet. Kindly contact support."));
  } catch (err) {
    yield put(serverError(err));
  }
}

/** Other government forms referrences **/
export function* retrieveCustomFormsRefs() {
  const requestURL = API_WORKFLOWFORMLIST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.GetWorkFlowFormsResult[0];

    if (resp.ResponseCode === 200) yield put(retrieveSuccessCustomFormsReferrences(resp.ObjectList));
    if (resp.ErrorCode !== 0) if (resp.ErrorCode === 401) yield put(sessionIsExpired()); else yield put(retrieveErrorCustomFormsReferrences(resp));
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
    takeLatest(RETRIEVE_CUSTOMFORMS, retrieveCustomFormsRefs),
    takeLatest(CREATE_CUSTOMFORMS, getUploadFile),
  ];
}
