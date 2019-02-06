/**
 * Get our Emp Profile Related Info
 */
import { call, put, select, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Import Request (fetch api)
import request from 'utils/request';

import {
    API_RETRIEVEOTLIST,
} from 'containers/App/constants';

import {
    sessionIsExpired,
} from 'containers/App/actions';

import {
    makeSelectToken,
    makeSelectUsername
} from 'containers/App/selectors';

import {
    // makeSelectOTFilter
} from './selectors';

import {
    // GET_OTLIST,
    OTLIST_ERROR,
    OTLIST_SUCCESS,
} from './constants';


import {
    retrieveErrorList,
    retrieveSuccessList,
} from './actions';

let username;
let token;


export function* getOTList() {
    // console.log("GET OT");
    const requestURL = API_RETRIEVEOTLIST;
    let otFilter = yield select(makeSelectOTFilter());

    // console.log(otFilter);
    // Declare our headers defaults
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username,
        },
        body: otFilter,
    };

    try {

        // Call our request helper ('utils/request') to connect to our API
        let otRqs = yield call(request, requestURL, headers);
        // console.log(otRqs);
        let resp = otRqs.GetOTRequestListingsResult[0];

        if (resp.ResponseCode === 200) {
            // Assign our response ObjectList in variable
            const otRqsObjeclist = resp.ObjectList;
            const listPageInfo = resp.PageDetails;
            // On success, put our retrieved data in our state tree
            yield delay(500);
            yield put(retrieveSuccessList(otRqsObjeclist, listPageInfo));
        } else if (resp.ErrorCode === 204) {
            yield put(retrieveErrorList(resp));
        }

        if (resp.ErrorCode === 401) {
            yield put(sessionIsExpired());
        }
    } catch (err) {
        yield put(retrieveErrorList(err));
    }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* otSagas() {
    // Watches for actions and calls the function when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount

    token = yield select(makeSelectToken());
    username = yield select(makeSelectUsername());

    // yield takeEvery(GET_OTLIST, getOTList);
}
