/**
 * Get our Employee Masterlist
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import {
  API_EMPLISTS,
  API_PR_PAYROLLDATES,
  API_PR_PAYROLLREVIEW,
  API_REPORT_PR_REVIEW,
  API_PR_PAYSLIP,
  API_PR_EMPONSPOTDEDUCT,
  API_PR_EMPONSPOTEARN,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  PAYROLLDATE_LIST,
  PREMP_LIST,
  PRPAYDAY_INFO,
  PRREVIEW,
  GEN_PAYSLIP,
  EMP_ONSPOTDEDUCT,
  EMP_ONSPOTEARNING,
} from './constants';

import {
  retrievalSuccess,
  retrievalFailed,
  retrievalPRDatesSuccess,
  retrievalPRDatesFailed,
  retrievePayReviewSuccess,
  retrievePayReviewFailed,
  retrievePayReviewReportSuccess,
  retrievePayReviewReportFailed,
  generatePaySlipSuccess,
  generatePaySlipError,
  empOnSpotDeductSuccess,
  empOnSpotDeductError,
  empOnSpotEarningSuccess,
  empOnSpotEarningError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectPRPayDate,
  // makeSelectPRPayMonth,
  // makeSelectPRPayYear,
  makeSelectPREmpSelProf,
  makeSelectPayslipIsEmail,
  makeSelectPayslipEmpID,
  makeSelectPayslipDate,
  makeSelectEmpSearch,
  makeSelectEmpLocation,
  makeSelectOnSpotData,
} from './selectors';

let username;
let token;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Employee Masterlist request/response handler
 */
export function* getPREmpList() {
  // Our API URL (from app/constants.js)
  const requestURL = API_EMPLISTS;

  // DTR payroll ID
  const payrollDtrID = yield select(makeSelectPRPayDate());
  let PayrollDateProcessed;
  if (payrollDtrID) {
    PayrollDateProcessed = payrollDtrID;
  }

  const search = yield select(makeSelectEmpSearch());
  let FirstAndLastName;
  if (search) {
    FirstAndLastName = search;
  }

  const location = yield select(makeSelectEmpLocation());
  let ComSiteLocID;
  if (location && location !== 'All') {
    ComSiteLocID = location;
  }

  // Get our Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex());

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Declare headers defaults
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
        'SortBy': 'LastName', // LastName, Mobile, CreatedDate
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
      },
      FirstAndLastName,
      ComSiteLocID,
      PayrollDateProcessed,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const objectList = resp.ObjectList;
      const pageDetails = resp.PageDetails;

      yield delay(500);
      // On success, put our retrieved data in our state tree
      yield put(retrievalSuccess(objectList, pageDetails));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalFailed(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievalFailed(err));
  }
}

/**
 * Finance Payroll Dates Request/Response handler
 */
export function* getPRPayDates() {
  // Get stored variables on state
  // const dteSelectedMn = yield select(makeSelectPRPayMonth());
  // const dteSelectedYr = yield select(makeSelectPRPayYear());

  const apiPRDateList = API_PR_PAYROLLDATES;

  const prDatesGenData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'SortBy': 'DateProcessed',
        'SortExpression': 'DESC',
      },
    }),
    // body: JSON.stringify({
    //   'MonthProcessed': "02", //dteSelectedMn.month
    //   'YearProcessed': "2018" //dteSelectedYr.year
    // }),
  };

  try {
    const apiReqPRPayReview = yield call(request, apiPRDateList, prDatesGenData);
    const respPRDatesRep = apiReqPRPayReview.GetPayrollDatesResult[0];

    if (respPRDatesRep.ResponseCode === 200) {
      const data = respPRDatesRep.ObjectList;
      const pages = respPRDatesRep.PageDetails;
      yield put(retrievalPRDatesSuccess(data, pages));
    }
    if (respPRDatesRep.ErrorCode !== 0) {
      if (respPRDatesRep.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalPRDatesFailed(respPRDatesRep));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievalPRDatesFailed(err));
  }
}

/**
 * Finance Payroll Pay Date/Review Information Request/Response handler
 */
export function* getPRPayDateInfo() {
  // Get stored variables on state
  const dteSelected = yield select(makeSelectPRPayDate());
  const empProfSelected = yield select(makeSelectPREmpSelProf());

  const apiPRPayReview = API_PR_PAYROLLREVIEW;

  const prPayReviewData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'DateProcessedFrom': dteSelected,
      'EmpProfileID': empProfSelected.EmpProfileID,
    }),
  };

  try {
    const apiReqPRPayReview = yield call(request, apiPRPayReview, prPayReviewData);
    const respPRPayReview = apiReqPRPayReview.GetPayrollReviewResult[0];

    if (respPRPayReview.ResponseCode === 200) {
      yield put(retrievePayReviewSuccess(respPRPayReview.ObjectList));
    }
    if (respPRPayReview.ErrorCode !== 0) {
      if (respPRPayReview.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievePayReviewFailed(respPRPayReview));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievePayReviewFailed(err));
  }
}

/**
 * Finance Payroll Review Report Request/Response handler
 */
export function* getPRReviewReport() {
  // Get stored variables on state
  const dteSelected = yield select(makeSelectPRPayDate());
  // var empProfSelected = yield select(makeSelectPREmpSelProf());
  // console.log(dteSelected);
  const apiPRPayReviewReport = API_REPORT_PR_REVIEW;

  // 'EmpProfileID': empProfSelected.EmpProfileID, TODO:
  /**
   * TODO: Needs to support Employee ID, Department and Workgroup extractions
   */
  const prPayReviewReportData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'DateProcessedFrom': dteSelected,
      'DateProcessedTo': dteSelected,
    }),
  };

  try {
    const apiReqPRPayReport = yield call(request, apiPRPayReviewReport, prPayReviewReportData);
    const respPRPayReport = apiReqPRPayReport.ExportPayrollResult[0];

    if (respPRPayReport.ResponseCode === 200) {
      yield put(retrievePayReviewReportSuccess(respPRPayReport.ObjectList));
    }
    if (respPRPayReport.ErrorCode !== 0) {
      if (respPRPayReport.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievePayReviewReportFailed(respPRPayReport));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievePayReviewReportFailed(err));
  }
}

/**
 * Generate payslip report of employee request/response handler
 */
export function* getGeneratePayslip() {
  // Retrieve if it is for email
  const isEmail = yield select(makeSelectPayslipIsEmail());

  // Retrieve Employee ID
  const empID = yield select(makeSelectPayslipEmpID());
  let EmpProfileID;
  if (empID) {
    EmpProfileID = empID;
  }

  // Retrieve Date
  const date = yield select(makeSelectPayslipDate());
  let DateProcessedFrom;
  if (date) {
    DateProcessedFrom = date;
  }

  // Api Url
  const requestURL = `${API_PR_PAYSLIP}isEmail=${isEmail}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      EmpProfileID,
      DateProcessedFrom,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.ExportPayslipResult[0];

    if (resp.ResponseCode === 200) {
      yield put(generatePaySlipSuccess(resp.ObjectList));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(generatePaySlipError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(generatePaySlipError(err));
  }
}

/**
 * Employee On Spot Deduct request/response handler
 */
export function* getEmpOnSpotDeduct() {
  const data = yield select(makeSelectOnSpotData('onSpotDeduct'));

  const requestURL = API_PR_EMPONSPOTDEDUCT;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddEmpOnSpotDeductResult[0];

    if (resp.ResponseCode === 200) {
      yield put(empOnSpotDeductSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(empOnSpotDeductError(resp));
      }
    }
  } catch (err) {
    yield put(empOnSpotDeductError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Employee On Spot Earning request/response handler
 */
export function* getEmpOnSpotEarning() {
  const data = yield select(makeSelectOnSpotData('onSpotEarning'));

  const requestURL = API_PR_EMPONSPOTEARN;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddEmpOnSpotEarnResult[0];

    if (resp.ResponseCode === 200) {
      yield put(empOnSpotEarningSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(empOnSpotEarningError(resp));
      }
    }
  } catch (err) {
    yield put(empOnSpotEarningError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* prPayProcessingSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(PREMP_LIST, getPREmpList);
  yield takeLatest(PAYROLLDATE_LIST, getPRPayDates);
  yield takeLatest(PRPAYDAY_INFO, getPRPayDateInfo);
  yield takeLatest(PRREVIEW, getPRReviewReport);
  yield takeLatest(GEN_PAYSLIP, getGeneratePayslip);
  yield takeLatest(EMP_ONSPOTDEDUCT, getEmpOnSpotDeduct);
  yield takeLatest(EMP_ONSPOTEARNING, getEmpOnSpotEarning);
}
