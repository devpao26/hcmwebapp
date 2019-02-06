/**
 * Get our Emp Profile Related Info
 */
import { call, put, select, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Import Request (fetch api)
import request from 'utils/request';

import {
    API_SHIFTREC,
} from 'containers/App/constants';

import {
    sessionIsExpired,
} from 'containers/App/actions';

import {
    makeSelectToken,
    makeSelectUsername,
    makeSelectUserInfo,
} from 'containers/App/selectors';

import {
    makeSelectSHIFTSUMMFilter
} from './selectors';

import {
    GET_SHIFTSUMMLIST,
} from './constants';


import {
    retrieveErrorList,
    retrieveSuccessList,
} from './actions';

let username;
let token;


export function* getSHIFTSUMMList() {
    // console.log("GET SHIFTSUMM");
    const requestURL = API_SHIFTREC;
    let shiftsummFilter = yield select(makeSelectSHIFTSUMMFilter());
    const pageIndex = JSON.parse(shiftsummFilter).SortFilter.PageIndex;
    const date = JSON.parse(shiftsummFilter).date;
    
    // Get stored employee profile id Based from the Creator
    const empSelected = JSON.parse(shiftsummFilter).CreatedBy;;

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username,
        },
        body: JSON.stringify({
            'SortFilter': {
                'PageIndex': pageIndex ? pageIndex : 1,
                'PageSize': 50,
            },
            'EmpProfileID': empSelected,
            'DateByShift': date
        }),
    };

    try {

        // Call our request helper ('utils/request') to connect to our API
        let shiftsummRqs = yield call(request, requestURL, headers);

        let rsp = shiftsummRqs.GetShiftRecordListingsResult[0];
        if (rsp.ResponseCode === 200) {
            // Assign our response ObjectList in variable
            const shiftsummRqsObjeclist = rsp.ObjectList;
            const listPageInfo = rsp.PageDetails;
            // On success, put our retrieved data in our state tree
            yield delay(500);
            yield put(retrieveSuccessList(shiftsummRqsObjeclist, listPageInfo));
        } else if (rsp.ErrorCode === 204) {
            yield put(retrieveErrorList(rsp));
        }

        if (rsp.ErrorCode === 401) {
            yield put(sessionIsExpired());
        }
    } catch (err) {
        yield put(retrieveErrorList(err));
    }
}



/**
 * Root saga manages watcher lifecycle
 */
export default function* shiftSummSagas() {
    // Watches for actions and calls the function when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount

    token = yield select(makeSelectToken());
    username = yield select(makeSelectUsername());
    // fork(getSHIFTSUMMList);
    yield takeEvery(GET_SHIFTSUMMLIST, getSHIFTSUMMList);
}
