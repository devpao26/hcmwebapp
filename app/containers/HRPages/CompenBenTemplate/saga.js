/**
 * Compensation and Benefit Template Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  API_COMPBENTEMPLATE,
  API_COMPBENTEMPLATELIST,
  API_EMPLISTS,
  API_COMPBENFOREMP,
  API_COMPBENBENEFITTYPE,
} from 'containers/App/constants';

import {
  GET_BENEFITTYPES,
  GET_TEMPLATES,
  GET_ENROLLEDEMP,
  GET_ENROLLEDEMPRESET,
  GET_EMPLIST,
  ADD_TOTEMPLATE,
  EMP_UNASSIGN,
  CREATE_NEWTEMP,
  DELETE_TEMPLATE,
} from './constants';

import {
  getBenefitTypesSuccess,
  getBenefitTypesError,
  getTemplateListSuccess,
  getTemplateListError,
  getEnrolledEmp,
  getEnrolledEmpSuccess,
  getEnrolledEmpError,
  getEmployeeListSuccess,
  getEmployeeListError,
  assignEmpToTemplateSuccess,
  assignEmpToTemplateError,
  unAssignToTemplateSuccess,
  unAssignToTemplateError,
  createNewTemplateSuccess,
  createNewTemplateError,
  deleteTemplateSuccess,
  deleteTemplateError,
} from './actions';

import {
  makeSelectSort,
  makeSelectSearch,
  makeSelectPageIndex,
  makeSelectTemplateID,
  makeSelectAssignEmpID,
  makeSelectUnassignEmpID,
  makeSelectTemplateData,
  makeSelectTemplateIsNew,
} from './selectors';

let username;
let token;

const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */

/**
 * Retrieve Template List request/response handler
 */
export function* getTemplateLists() {
  const requestURL = API_COMPBENTEMPLATELIST;

  // Template ID
  const templateID = yield select(makeSelectTemplateID());

  // Search Value
  const search = yield select(makeSelectSearch('templateList'));
  let Name;
  if (search) {
    Name = search;
  }

  // Sort Value
  const sortBy = yield select(makeSelectSort('templateList'));
  const sortExpression = (sortBy === 'Name') ? 'ASC' : 'DESC';
  let SortBy;
  if (sortBy) {
    SortBy = sortBy;
  }

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('templateList'));

  if (PageIndex) {
    pageIndex = PageIndex;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortExpression': sortExpression,
        SortBy,
      },
      Name,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    const resp = apirequest.GetCompBenTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      const id = (!templateID) ? data[0].CompBenTemplateID : templateID;

      yield delay(500);
      yield put(getTemplateListSuccess(data, pages, id));
      yield put(getEnrolledEmp(id, 1, false));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTemplateListError(resp));
      }
    }
  } catch (err) {
    yield put(getTemplateListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Retrieve Enrolled Employees
 */
export function* getEnrolledEmployees() {
  // Search employee value
  const search = yield select(makeSelectSearch('enrolledList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

  // Template ID
  const templateID = yield select(makeSelectTemplateID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('enrolledList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  const requestURL = API_EMPLISTS;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName',
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withWorkGroup': true,
      },
      'CompBenTemplateID': templateID,
      FirstAndLastName,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield delay(300);
      yield put(getEnrolledEmpSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrolledEmpError(resp));
      }
    }
  } catch (err) {
    yield put(getEnrolledEmpError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get Add to Template Employee List
 */
export function* getEmployeeListToAdd() {
  // Search employee value
  const search = yield select(makeSelectSearch('employeeList'));
  let FirstAndLastName;
  if (search) FirstAndLastName = search;

  // Template ID
  const templateID = yield select(makeSelectTemplateID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('employeeList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  const requestURL = API_EMPLISTS;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName',
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withCompBenTemplates': true,
      },
      'HasNoCompBenTemplateID': templateID,
      FirstAndLastName,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield delay(300);
      yield put(getEmployeeListSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmployeeListError(resp));
      }
    }
  } catch (err) {
    yield put(getEmployeeListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Unassign Employee to selected template
 */
export function* getAddToTemplate() {
  // Employee ID
  const empID = yield select(makeSelectAssignEmpID());

  // Template ID
  const templateID = yield select(makeSelectTemplateID());

  const requestURL = `${API_COMPBENFOREMP}${templateID}/${empID}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AssignCompBenTemplateToEmployeeResult[0];

    if (resp.ResponseCode === 200) {
      yield put(assignEmpToTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(assignEmpToTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(assignEmpToTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Unassign Employee to selected template
 */
export function* getUnassignEmp() {
  const empID = yield select(makeSelectUnassignEmpID());

  const requestURL = API_COMPBENFOREMP + empID;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UnassignCompBenTemplateToEmployeeResult[0];

    if (resp.ResponseCode === 200) {
      yield put(unAssignToTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(unAssignToTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(unAssignToTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Retrieve Benefit Types
 */
export function* getBenefitTypes() {
  const requestURL = API_COMPBENBENEFITTYPE;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetCompBenefitTypeListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getBenefitTypesSuccess(data));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getBenefitTypesError(resp));
      }
    }
  } catch (err) {
    yield put(getBenefitTypesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Create/Edit New Template
 */
export function* getCreateEditTemplate() {
  // Template Data
  const data = yield select(makeSelectTemplateData());

  // Template Id
  const templateID = yield select(makeSelectTemplateID());

  // If creating
  const isNew = yield select(makeSelectTemplateIsNew());

  let requestURL;
  let method;
  if (isNew) {
    requestURL = API_COMPBENTEMPLATE;
    method = 'POST';
  } else {
    requestURL = `${API_COMPBENTEMPLATE}/${templateID}`;
    method = 'PUT';
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isNew) {
      resp = apirequest.AddCompBenTemplateResult[0];
    } else {
      resp = apirequest.UpdateCompBenTemplateResult[0];
    }

    if (resp.ResponseCode === 200) {
      yield put(createNewTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(createNewTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(createNewTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Delete Template
 */
export function* getDeleteTemplate() {
  // Template ID
  const templateID = yield select(makeSelectTemplateID());

  const requestURL = `${API_COMPBENTEMPLATE}/${templateID}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.DeleteCompBenTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(deleteTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(deleteTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(deleteTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* compenBenSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_BENEFITTYPES, getBenefitTypes);
  yield takeLatest(GET_TEMPLATES, getTemplateLists);
  yield takeLatest(GET_ENROLLEDEMP, getEnrolledEmployees);
  yield takeLatest(GET_ENROLLEDEMPRESET, getEnrolledEmployees);
  yield takeLatest(GET_EMPLIST, getEmployeeListToAdd);
  yield takeLatest(ADD_TOTEMPLATE, getAddToTemplate);
  yield takeLatest(EMP_UNASSIGN, getUnassignEmp);
  yield takeLatest(CREATE_NEWTEMP, getCreateEditTemplate);
  yield takeLatest(DELETE_TEMPLATE, getDeleteTemplate);
}
