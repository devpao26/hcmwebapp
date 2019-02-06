/**
 * App Saga
*/

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { API_HRFREQUEST } from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired, serverError } from 'containers/App/actions';

import request from 'utils/request';

import { CREATE_FORM } from './constants';

import { createFormRequestSuccess, createFormRequestError } from './action';

import { makeSelectSaveFormData } from './selector';

let username; let token; let requestURL;

/** Create Form Request **/
export function* createFormRequest() {
  const data = yield select(makeSelectSaveFormData());

  let skillsList = data.selectedSkillsIds;
  let jobassesmentList = data.selectedAssesmentIds;

  // Iterate skills ids
  skillsList = skillsList.map((item) => {
    return { SkillID: item };
  });
  // Iterate assessment ids
  jobassesmentList = jobassesmentList.map((item) => {
    return { JobAssessTestID: item };
  });

  const ComSiteLocID = data.location;
  const Descr = data.jobdescrandresp;
  const EmploymentStatusID = data.employmentstatus;
  const JobAssessReqsList = jobassesmentList;
  const JobLvlID = data.joblevel;
  const JobSkillsReqsList = skillsList;
  const MaxComp = Number(data.maxsalary);
  const MinComp = Number(data.minsalary);
  const Title = data.jobtitle;

  requestURL = API_HRFREQUEST;

  const headers = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', username, token },
    body: JSON.stringify({
      ComSiteLocID,
      Descr,
      EmploymentStatusID,
      JobAssessReqsList,
      JobLvlID,
      JobSkillsReqsList,
      MaxComp,
      MinComp,
      Title,
    }),
  };
  try {
    const apiRequest = yield call(request, requestURL, headers);
    const resp = apiRequest.CreateHRFRequestResult[0];
    if (resp.ResponseCode === 200) yield put(createFormRequestSuccess('Your request has been sent.'));

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
    takeLatest(CREATE_FORM, createFormRequest),
  ];
}
